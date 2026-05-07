package org.example.todolistbackend.service;

import lombok.RequiredArgsConstructor;
import org.example.todolistbackend.exception.InvalidDataException;
import org.example.todolistbackend.exception.UserAlreadyExistsException;
import org.example.todolistbackend.model.User;
import org.example.todolistbackend.model.enums.UserType;
import org.example.todolistbackend.repository.IUsersRepo;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class AuthService implements IAuthService {

    private final IUsersRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void createNormalUser(String name, String email, String password) {
        if(userRepo.existsUserByEmail(email)){
            throw new UserAlreadyExistsException("User with email already exists");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setUserType(UserType.NORMAL);

        String hashPassword = passwordEncoder.encode(password);
        user.setPasswordHash(hashPassword);

        userRepo.save(user);
    }

    @Override
    public User checkUser(String email, String password) {
        if(userRepo.existsUserByEmail(email)){
            User user = userRepo.getUserByEmail(email);
            if(passwordEncoder.matches(password, user.getPasswordHash())){
                return user;
            }else{
                throw new InvalidDataException("Invalid login data");
            }
        }else{
            throw new InvalidDataException("Invalid login data");
        }
    }

    @Override
    public void logout() {
        return;
    }
}
