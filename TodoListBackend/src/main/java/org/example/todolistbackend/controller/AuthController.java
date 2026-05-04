package org.example.todolistbackend.controller;

import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.Token;
import org.example.todolistbackend.dto.AuthResponseDTO;
import org.example.todolistbackend.dto.LoginDTO;
import org.example.todolistbackend.dto.RegisterDTO;
import org.example.todolistbackend.dto.UserDTO;
import org.example.todolistbackend.exception.InvalidLoginDataException;
import org.example.todolistbackend.exception.UserAlreadyExistsException;
import org.example.todolistbackend.mapper.UserMapper;
import org.example.todolistbackend.model.User;
import org.example.todolistbackend.service.AuthService;
import org.example.todolistbackend.service.IAuthService;
import org.example.todolistbackend.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/todo/auth")
public class AuthController {

    private final IAuthService authService;
    private final JwtService jwtService;

    @PostMapping(path = "/register")
    public ResponseEntity<Void> registerUser(@RequestBody RegisterDTO registerDto){
        try{
            authService.createNormalUser(registerDto.getName(), registerDto.getEmail(), registerDto.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping(path = "/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDto){
        try{
            User user = authService.checkUser(loginDto.getEmail(), loginDto.getPassword());
            UserDTO userDto = UserMapper.userToUserDTO(user);
            AuthResponseDTO authResponseDTO = new AuthResponseDTO();
            String accessToken = jwtService.generateToken(user);
            authResponseDTO.setAccessToken(accessToken);
            authResponseDTO.setUser(userDto);
            return ResponseEntity.status(HttpStatus.OK).body(authResponseDTO);
        }catch (InvalidLoginDataException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
