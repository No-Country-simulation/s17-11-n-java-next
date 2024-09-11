package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.request.ServiceReq;
import com.nocountry.retrueque.service.interfaces.ServicesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/service")
@Tag(name = "Services")
public class ServicesController {
  private final ServicesService servicesService;

  @Operation(summary = "Create a new service", description = "Available for USER role.")
  @SecurityRequirement(name = "bearer-key")
  @PostMapping(consumes = "multipart/form-data")
  public ResponseEntity<?> create(@ModelAttribute @Valid ServiceReq request){
    var response = this.servicesService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(response));
  }

  @Operation(summary = "Get all services", description = "Use a filter by departamento, provincia and category")
  @GetMapping
  public ResponseEntity<?> getAll(Pageable pageable,
                                  @RequestParam(value = "departamentoId", required = false) Integer departamentoId,
                                  @RequestParam(value = "provinciaId", required = false) Integer provinciaId,
                                  @RequestParam(value = "categoryId", required = false) Integer categoryId
                                  ){
    var response = this.servicesService.getAll(pageable, departamentoId, provinciaId, categoryId);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Get Service by id")
  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable long id){
    var response = this.servicesService.getById(id);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Get all Service by user id")
  @GetMapping("/user/{id}")
  public ResponseEntity<?> getByUserId(@PathVariable long id){
    var response = this.servicesService.getAllByUserId(id);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Update service", description = "Update using body and path, only available by authenticated user.")
  @SecurityRequirement(name = "bearer-key")
  @PutMapping("/{id}")
  public ResponseEntity<?> updateById(@RequestBody @Valid ServiceReq request, @PathVariable long id){
    var response = this.servicesService.updateById(request, id);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Delete service", description = "Verification of the authenticated user against service-user.")
  @SecurityRequirement(name = "bearer-key")
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteById(@PathVariable long id){
    var response = this.servicesService.deleteById(id);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }
}
