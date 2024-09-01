package com.nocountry.retrueque.exception;

import com.nocountry.retrueque.controller.ApiResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<ApiResponse<?>> handleNotFoundException(EntityNotFoundException e, WebRequest request) {
    var error = new ApiResponse<>(e.getMessage(), null);
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(NoHandlerFoundException.class)
  public ResponseEntity handleNoHandlerFoundException(NoHandlerFoundException ex, WebRequest request) {
    ApiResponse<String> response = new ApiResponse("Resource not found " + request.getDescription(false), null);
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<?> handleInvalidField(MethodArgumentNotValidException e) {
    Map<String, String> errors = new HashMap<>();
    e.getBindingResult().getAllErrors().forEach((err) -> {
      String fieldName = ((FieldError) err).getField();
      String message = err.getDefaultMessage();
      errors.put(fieldName, message);
    });
    return new ResponseEntity<>(new ApiResponse<>(errors.toString(), null), HttpStatus.BAD_REQUEST);
  }
}
