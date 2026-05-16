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
public class updateTaskDTO {
    private String taskName;
    private TaskPriority taskPriority;
    private String description;
    private boolean daily;
    private LocalDate dueDate;
}
