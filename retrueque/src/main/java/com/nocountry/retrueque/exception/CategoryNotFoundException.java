package com.nocountry.retrueque.exception;

import jakarta.persistence.EntityNotFoundException;

public class CategoryNotFoundException extends EntityNotFoundException {
  public CategoryNotFoundException(long id) {
    super("Category not found, id: "+id);
  }
}
