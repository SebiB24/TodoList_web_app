package org.example.todolistbackend.service;

import org.example.todolistbackend.model.User;

public interface IAuthService {
    public void  createNormalUser(String name, String email, String password);
    public User checkUser(String email, String password);
    public void logout();
}
