package org.example.todolistbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Usually disabled for JWT APIs
                .authorizeHttpRequests(auth -> auth
                        // 1. Whitelist Auth endpoints so people can actually log in/register
                        .requestMatchers("/todo/**").permitAll()
                        // 2. Whitelist Swagger UI and OpenAPI docs
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        // 3. Lock down everything else!
                        .anyRequest().authenticated()
                );
        // ... (your other JWT configuration here)

        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
