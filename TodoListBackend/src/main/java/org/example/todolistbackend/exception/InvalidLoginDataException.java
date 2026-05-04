package org.example.todolistbackend.exception;

public class InvalidLoginDataException extends RuntimeException {
    public InvalidLoginDataException(String message) {
        super(message);
    }
}
