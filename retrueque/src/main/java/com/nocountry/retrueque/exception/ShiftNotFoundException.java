package com.nocountry.retrueque.exception;

import jakarta.persistence.EntityNotFoundException;

public class ShiftNotFoundException extends EntityNotFoundException {
  public ShiftNotFoundException(long id) {
    super("Shift not found, id: "+id);
  }
}
