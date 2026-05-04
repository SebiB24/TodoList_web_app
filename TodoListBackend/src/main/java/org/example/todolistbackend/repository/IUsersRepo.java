package org.example.todolistbackend.repository;

import org.example.todolistbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsersRepo extends JpaRepository<User, Integer> {
    public boolean existsUserByEmail(String email);
    public User getUserByEmail(String email);
}
