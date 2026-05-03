package org.example.todolistbackend.repository;

import org.example.todolistbackend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITasksRepo extends JpaRepository<Task, Integer> {
}
