package org.example.todolistbackend.controller;

import lombok.RequiredArgsConstructor;
import org.example.todolistbackend.dto.UserDTO;
import org.example.todolistbackend.mapper.UserMapper;
import org.example.todolistbackend.model.User;
import org.example.todolistbackend.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "todo/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping(path = "/users")
    public ResponseEntity<List<UserDTO>> users(@AuthenticationPrincipal User user){
        List<User> users = adminService.getUsers();
        List<UserDTO> userDtos = users.stream().map(UserMapper::userToUserDTO).toList();
        return ResponseEntity.status(HttpStatus.OK).body(userDtos);
    }

    @DeleteMapping(path = "/{userId}/remove")
    public ResponseEntity<Void> removeUser(@PathVariable Integer userId, @AuthenticationPrincipal User user){
        adminService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(path = "/{userId}/promote")
    public ResponseEntity<UserDTO> promoteUser(@PathVariable Integer userId, @AuthenticationPrincipal User user){
        User promotedUser = adminService.promoteUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(UserMapper.userToUserDTO(promotedUser));
    }
}
