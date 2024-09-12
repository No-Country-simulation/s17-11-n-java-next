package com.nocountry.retrueque.exception;

public class InvalidPaginationParameterException extends RuntimeException {
  public InvalidPaginationParameterException(String message) {
    super(message);
  }
}
