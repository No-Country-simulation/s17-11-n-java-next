package com.nocountry.retrueque.controller;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApiResponse<T> {
  private boolean isSuccess;
  private String message;
  private T data;

  public ApiResponse(T data) {
    this.data = data;
    this.message = "Operation successful";
    this.isSuccess = true;
  }

  public ApiResponse(String message, T data){
    this.message = message;
    this.isSuccess = false;
    this.data = data;
  }
}
