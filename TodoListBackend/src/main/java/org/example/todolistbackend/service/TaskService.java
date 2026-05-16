package org.example.todolistbackend.service;

import lombok.RequiredArgsConstructor;
import org.example.todolistbackend.dto.CreateTaskDTO;
import org.example.todolistbackend.dto.TaskDTO;
import org.example.todolistbackend.model.Task;
import org.example.todolistbackend.model.User;
import org.example.todolistbackend.model.enums.TaskPriority;
import org.example.todolistbackend.model.enums.TaskStatus;
import org.example.todolistbackend.repository.ITasksRepo;
import org.example.todolistbackend.repository.IUsersRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {
    private final ITasksRepo tasksRepo;
    private final IUsersRepo usersRepo;

    public Task createTask(CreateTaskDTO createTaskDto, User user){
        Task task = new Task();
        task.setName(createTaskDto.getName());
        task.setPriority(createTaskDto.getPriority());
        task.setDescription(createTaskDto.getDescription());
        task.setDaily(createTaskDto.isDaily());
        task.setDueDate(createTaskDto.getDueDate());
        task.setUser(user);

        tasksRepo.save(task);
        return task;
    }


    public List<Task> getTasks(TaskStatus status, boolean today, User user){
        if(today){
            LocalDate todayDate = LocalDate.now();
            return tasksRepo.findTasksByUserAndStatusAndDueDate(user, status, todayDate);
        }
        return tasksRepo.findTasksByUserAndStatus(user, status);
    }


    public Task completeTask(Integer taskId, User user){
        Task task = tasksRepo.findTaskById(taskId);
        task.setStatus(TaskStatus.COMPLETE);
        user.increaseScore();
        usersRepo.save(user);
        return task;
    }

    public Task undoTask(Integer taskId, User user){
        Task task = tasksRepo.findTaskById(taskId);
        task.setStatus(TaskStatus.TODO);
        user.reduceScore();
        usersRepo.save(user);
        return task;
    }

    public void deleteTask(Integer taskId){
        Task task = tasksRepo.findTaskById(taskId);
        tasksRepo.delete(task);
    }

    public Task updateTask(Integer taskId, String name, TaskPriority priority, String description, boolean daily, LocalDate dueDate){
        Task task = tasksRepo.findTaskById(taskId);
        task.setName(name);
        task.setPriority(priority);
        task.setDescription(description);
        task.setDaily(daily);
        task.setDueDate(dueDate);
        tasksRepo.save(task);
        return task;
    }
}
