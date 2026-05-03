package org.example.todolistbackend;

import org.example.todolistbackend.model.Task;
import org.example.todolistbackend.model.User;
import org.example.todolistbackend.model.enums.TaskPriority;
import org.example.todolistbackend.model.enums.TaskStatus;
import org.example.todolistbackend.model.enums.UserType;
import org.example.todolistbackend.repository.ITasksRepo;
import org.example.todolistbackend.repository.IUsersRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Transactional
class TodoListDataBaseConnectionTests {
    @Autowired
    private IUsersRepo userRepository;

    @Autowired
    private ITasksRepo taskRepository;

    @Test
    void testFullDatabaseFlow() {
        User user = new User();
        user.setName("Seby Test");
        user.setEmail("test@example.com");
        user.setPasswordHash("encoded_password_123");
        user.setUserType(UserType.NORMAL);
        user.setScore(100);

        User savedUser = userRepository.save(user);

        assertNotNull(savedUser.getId(), "ID should be generated");
        assertNotNull(savedUser.getCreatedAt(), "The Timestamp should be generated");

        Task task = new Task(savedUser);
        task.setName("Finalizare proiect ISS");
        task.setDescription("Trebuie să terminăm maparea Hibernate");
        task.setStatus(TaskStatus.TODO);
        task.setPriority(TaskPriority.PRIORITY_1);
        task.setDueDate(LocalDate.now().plusDays(7));
        task.setDaily(false);

        Task savedTask = taskRepository.save(task);

        assertNotNull(savedTask.getId());
        assertEquals(savedUser.getId(), savedTask.getUser().getId(), "Task-ul trebuie să aparțină user-ului corect");
        assertEquals("test@example.com", savedTask.getUser().getEmail());

        System.out.println("✅ Test reușit! User ID: " + savedUser.getId() + " | Task ID: " + savedTask.getId());
    }
}
