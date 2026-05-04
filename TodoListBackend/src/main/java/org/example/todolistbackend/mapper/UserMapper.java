package org.example.todolistbackend.mapper;

import org.example.todolistbackend.dto.UserDTO;
import org.example.todolistbackend.model.User;

public class UserMapper {
    public static UserDTO userToUserDTO(User user){
        UserDTO userDto = new UserDTO();
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setUserType(user.getUserType());
        userDto.setScore(user.getScore());

        return userDto;
    }
}
