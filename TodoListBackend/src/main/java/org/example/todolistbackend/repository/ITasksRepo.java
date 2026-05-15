package org.example.todolistbackend.repository;

import org.example.todolistbackend.model.Task;
import org.example.todolistbackend.model.User;
import org.example.todolistbackend.model.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ITasksRepo extends JpaRepository<Task, Integer> {
    public List<Task> findTasksByUserAndStatus(User user, TaskStatus status);
    public List<Task> findTasksByUserAndStatusAndDueDate(User user, TaskStatus status, LocalDate dueDate);
    public Task findTaskById(Integer taskId);
}
