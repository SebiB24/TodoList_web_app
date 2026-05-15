package org.example.todolistbackend.mapper;

import org.example.todolistbackend.dto.TaskDTO;
import org.example.todolistbackend.model.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {
    public static TaskDTO taskToTaskDTO(Task task){
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setName(task.getName());
        taskDTO.setStatus(task.getStatus());
        taskDTO.setPriority(task.getPriority());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setDaily(task.isDaily());
        taskDTO.setDueDate(task.getDueDate());

        return taskDTO;
    }
}
