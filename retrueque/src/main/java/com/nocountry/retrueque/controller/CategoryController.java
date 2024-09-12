package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.request.CategoryReq;
import com.nocountry.retrueque.model.dto.response.CategoryRes;
import com.nocountry.retrueque.service.interfaces.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.base}/category")
@RequiredArgsConstructor
@Tag(name = "Categories")
public class CategoryController {
  private final CategoryService categoryService;

  @Operation(summary = "Create a category", description = "Temporarily Available  for the role USER.")
  @SecurityRequirement(name = "bearer-key")
  @PostMapping
  public ResponseEntity<?> create(@RequestBody @Valid CategoryReq categoryReq){
    var response = this.categoryService.create(categoryReq);
    return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<CategoryRes>(response));
  }

  @Operation(summary = "Find all categories.", description = "Temporarily Available  for the role USER.")
  @GetMapping()
  public ResponseEntity<?> getAll(){
    var response = this.categoryService.getAll();
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Find by id.", description = "Put the id in the url, Temporarily Available  for the role USER.")
  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable long id){
    var response = this.categoryService.getById(id);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Delete category by id", description = "Temporarily Available  for the role USER.")
  @DeleteMapping("/{id}")
  @SecurityRequirement(name = "bearer-key")
  public ResponseEntity<?> deleteById(@PathVariable long id){
    var response = this.categoryService.deleteById(id);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Update category by id", description = " Temporarily Available  for the role USER.")
  @SecurityRequirement(name = "bearer-key")
  @PutMapping("/{id}")
  public ResponseEntity<?> updateById(@RequestBody @Valid CategoryReq categoryReq,
                                      @PathVariable long id){
    var response = this.categoryService.updateById(categoryReq, id);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }
}
