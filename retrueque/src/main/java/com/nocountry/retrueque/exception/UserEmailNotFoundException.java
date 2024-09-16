package com.nocountry.retrueque.exception;

public class UserEmailNotFoundException extends RuntimeException {
    public UserEmailNotFoundException(String email) {
        super("User with email "+email+" not found");
    }
}
