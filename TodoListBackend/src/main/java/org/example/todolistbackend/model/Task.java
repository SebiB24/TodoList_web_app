package org.example.todolistbackend.model;

import jakarta.persistence.*;
import org.example.todolistbackend.model.enums.TaskPriority;
import org.example.todolistbackend.model.enums.TaskStatus;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Date;

@Entity
@Table(name = "Tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.TODO;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority;

    private String description;

    private boolean daily = false;

    private LocalDate dueDate;

    @CreationTimestamp
    @Column(updatable = false)
    private OffsetDateTime createdAt;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    // creators
    public Task() {}
    public Task(User user) {
        this.user = user;
    }

    // id
    public Integer getId() {
        return id;
    }

    // name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    // status
    public TaskStatus getStatus() {
        return status;
    }
    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    // priority
    public TaskPriority getPriority() {
        return priority;
    }
    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    // description
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    // daily
    public boolean isDaily() {
        return daily;
    }
    public void setDaily(boolean daily) {
        this.daily = daily;
    }

    // dueDate
    public LocalDate getDueDate() {
        return dueDate;
    }
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    // user
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    // createdAt
    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}
