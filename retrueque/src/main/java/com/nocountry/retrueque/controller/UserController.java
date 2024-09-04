package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.base}/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable long id){
    String response = this.userService.softDeleteById(id);
    return ResponseEntity.ok(new ApiResponse<String>(response));
  }

  @GetMapping
  public ResponseEntity<?> getAll(){
    return ResponseEntity.ok("paso la prueba");
  }

}

