package com.nocountry.retrueque.exception;

import jakarta.persistence.EntityNotFoundException;

public class UserNotFoundException extends EntityNotFoundException {
  public UserNotFoundException(String id) {
    super("Usuario no encontrado, id: "+id);
  }
}
