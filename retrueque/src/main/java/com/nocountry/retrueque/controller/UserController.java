package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.response.UserServicesRes;
import com.nocountry.retrueque.service.interfaces.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.base}/user")
@RequiredArgsConstructor
@Tag(name="Users")
@SecurityRequirement(name = "bearer-key")
public class UserController {
  private final UserService userService;

  @Operation(summary = "Soft delete using id",
  description = "Only the current user on token can use this endpoint or a User Admin. Available by Role ADMIN or User.")
  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable long id){
    String response = this.userService.softDeleteById(id);
    return ResponseEntity.ok(new ApiResponse<String>(response));
  }

  @GetMapping
  public ResponseEntity<?> getAll(){
    return ResponseEntity.ok("paso la prueba");
  }

  @GetMapping("/{userId}/services")
  public ResponseEntity<?> getUserWithServices(@PathVariable Long userId) {
    UserServicesRes response = userService.getUserWithServices(userId);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

}

