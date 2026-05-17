package org.example.todolistbackend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.example.todolistbackend.model.User;
import org.example.todolistbackend.repository.IUsersRepo;
import org.example.todolistbackend.service.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final IUsersRepo  usersRepo;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull  HttpServletResponse response,
            @NonNull  FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        final String jwt = authHeader.substring(7); // is "Bearer".length()

        try{
            final Integer userId = jwtService.extractId(jwt);
            if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = usersRepo.getUserById(userId);

                if(user != null){
                    List<SimpleGrantedAuthority> authorities = List.of(
                            new SimpleGrantedAuthority("ROLE_" + user.getUserType().toString())
                    );

                    // setting up the spring ID for the current request
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            authorities
                    ); // saves the user data
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // saves the network data of the request (like ip)
                    SecurityContextHolder.getContext().setAuthentication(authToken); // saves the spring ID
                }
            }
        } catch (Exception e){
        }
        filterChain.doFilter(request, response);
    }
}
