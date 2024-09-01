package com.nocountry.retrueque.exception;

import jakarta.persistence.EntityNotFoundException;

public class UserNotFoundException extends EntityNotFoundException {
  public UserNotFoundException(String id) {
    super("User not found, id: "+id);
  }
}
