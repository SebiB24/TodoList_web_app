package org.example.todolistbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.todolistbackend.model.enums.TaskPriority;
import org.example.todolistbackend.model.enums.TaskStatus;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private Integer id;
    private String name;
    private TaskStatus status;
    private TaskPriority priority;
    private String description;
    private boolean daily;
    private LocalDate dueDate;
}
