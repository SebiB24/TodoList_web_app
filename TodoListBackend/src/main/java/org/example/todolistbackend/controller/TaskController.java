package org.example.todolistbackend.controller;

import lombok.RequiredArgsConstructor;
import org.example.todolistbackend.dto.CreateTaskDTO;
import org.example.todolistbackend.dto.TaskDTO;
import org.example.todolistbackend.exception.InvalidDataException;
import org.example.todolistbackend.mapper.TaskMapper;
import org.example.todolistbackend.model.Task;
import org.example.todolistbackend.model.User;
import org.example.todolistbackend.model.enums.TaskStatus;
import org.example.todolistbackend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/todo/tasks")
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Void> createTask(@RequestBody CreateTaskDTO createTaskDto, @AuthenticationPrincipal User user){
        try{
            taskService.createTask(createTaskDto, user);
            return new ResponseEntity<>(HttpStatus.CREATED);

        }catch(InvalidDataException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
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
