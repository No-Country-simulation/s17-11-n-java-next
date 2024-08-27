package com.nocountry.retrueque.exception;

public class UserNotFoundException extends RuntimeException{
  public UserNotFoundException(String id) {
    super("Usuario no encontrado, id: "+id);
  }
}
