package com.nocountry.retrueque.exception;

import jakarta.persistence.EntityNotFoundException;

public class ServicesNotFoundException extends EntityNotFoundException {
  public ServicesNotFoundException(long id) {
    super("Service not found, id: "+id);
  }
}
