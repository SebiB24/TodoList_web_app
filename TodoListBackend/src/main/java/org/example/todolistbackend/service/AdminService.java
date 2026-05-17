package org.example.todolistbackend.service;

import lombok.RequiredArgsConstructor;
import org.example.todolistbackend.model.User;
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
}
