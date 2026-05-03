package org.example.todolistbackend.controller;

import lombok.RequiredArgsConstructor;
import org.example.todolistbackend.dto.RegisterDTO;
import org.example.todolistbackend.exception.UserAlreadyExistsException;
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

    @PostMapping(path = "/register")
    public ResponseEntity<Void> registerUser(@RequestBody RegisterDTO registerDto){
        try{
            authService.createNormalUser(registerDto.getName(), registerDto.getEmail(), registerDto.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

}
