package org.example.todolistbackend.service;

import lombok.RequiredArgsConstructor;
import org.example.todolistbackend.model.User;
import org.example.todolistbackend.model.enums.UserType;
import org.example.todolistbackend.repository.IUsersRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class AdminService {
    private final IUsersRepo usersRepo;

    public List<User> getUsers() {
        return usersRepo.findAll();
    }

    public void deleteUser(Integer userId) {
        User user = usersRepo.getUserById(userId);
        if(user.getUserType() != UserType.ADMIN)
            usersRepo.deleteById(userId);
    }

    public User promoteUser(Integer userId) {
        User user = usersRepo.getUserById(userId);
        user.setUserType(UserType.ADMIN);
        usersRepo.save(user);
        return user;
    }
}
