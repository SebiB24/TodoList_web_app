package org.example.todolistbackend.controller;

import lombok.RequiredArgsConstructor;
import org.example.todolistbackend.dto.CreateTaskDTO;
import org.example.todolistbackend.dto.TaskDTO;
import org.example.todolistbackend.exception.InvalidDataException;
import org.example.todolistbackend.mapper.TaskMapper;
import org.example.todolistbackend.model.Task;
import org.example.todolistbackend.model.User;
import org.example.todolistbackend.model.enums.TaskPriority;
import org.example.todolistbackend.model.enums.TaskStatus;
import org.example.todolistbackend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/todo/tasks")
public class TaskController {
    private final TaskService taskService;

    @PutMapping(path = "/{taskId}/complete")
    public ResponseEntity<TaskDTO> completeTask(
            @PathVariable Integer taskId,
            @AuthenticationPrincipal User user){
        Task task = taskService.completeTask(taskId, user);
        TaskDTO taskDto = TaskMapper.taskToTaskDTO(task);
        return ResponseEntity.status(HttpStatus.OK).body(taskDto);
    }

    @PutMapping(path = "/{taskId}/undo")
    public ResponseEntity<TaskDTO> undoTask(
            @PathVariable Integer taskId,
            @AuthenticationPrincipal User user){
        Task task = taskService.undoTask(taskId, user);
        TaskDTO taskDto = TaskMapper.taskToTaskDTO(task);
        return ResponseEntity.status(HttpStatus.OK).body(taskDto);
    }

    @PutMapping(path="/{taskId}/update")
    public ResponseEntity<TaskDTO> updateTask(
            @PathVariable Integer taskId,
            @RequestBody CreateTaskDTO createTaskDTO,
            @AuthenticationPrincipal User user){
        String name = createTaskDTO.getName();
        TaskPriority priority = createTaskDTO.getPriority();
        String description = createTaskDTO.getDescription();
        boolean daily = createTaskDTO.isDaily();
        LocalDate dueDate = createTaskDTO.getDueDate();
        Task task = taskService.updateTask(taskId, name, priority, description, daily, dueDate);
        TaskDTO taskDto = TaskMapper.taskToTaskDTO(task);
        return ResponseEntity.status(HttpStatus.OK).body(taskDto);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody CreateTaskDTO createTaskDto, @AuthenticationPrincipal User user){
        try{
            Task task = taskService.createTask(createTaskDto, user);
            TaskDTO taskDto = TaskMapper.taskToTaskDTO(task);
            return ResponseEntity.status(HttpStatus.OK).body(taskDto);

        }catch(InvalidDataException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping(path = "/{taskId}/delete")
    public ResponseEntity<TaskDTO> deleteTask(
            @PathVariable Integer taskId,
            @AuthenticationPrincipal User user){
        taskService.deleteTask(taskId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasks(
            @RequestParam TaskStatus status,
            @RequestParam boolean today,
            @AuthenticationPrincipal User user){

        List<TaskDTO> tasks = taskService.getTasks(status, today, user).stream()
                .map(TaskMapper::taskToTaskDTO)
                .toList();

        return ResponseEntity.status(HttpStatus.OK).body(tasks);
    }

}
