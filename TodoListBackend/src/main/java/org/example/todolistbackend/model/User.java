package org.example.todolistbackend.model;

import jakarta.persistence.*;
import org.example.todolistbackend.model.enums.UserType;
import org.hibernate.annotations.CreationTimestamp;


import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false,  unique=true)
    private String email;

    @Column(nullable=false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private UserType userType;

    private int score = 0;

    @CreationTimestamp
    @Column(updatable=false)
    private OffsetDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Task> tasks;


    // creator
    public User(){}

    public User(List<Task> tasks){
        this.tasks = tasks;
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

    // email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // passwordHash
    public String getPasswordHash() {
        return passwordHash;
    }
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    // userType
    public UserType getUserType() {
        return userType;
    }
    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    // score
    public int getScore() {
        return score;
    }
    public void setScore(int score) {
        this.score = score;
    }

    // createdAt
    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    // tasks
    public List<Task> getTasks() {
        return tasks;
    }
    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }



}
