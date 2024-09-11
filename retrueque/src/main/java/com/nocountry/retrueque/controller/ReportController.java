package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.request.ReportReq;
import com.nocountry.retrueque.model.dto.response.ReportRes;
import com.nocountry.retrueque.service.interfaces.ReportService;
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
@RequestMapping("${api.base}/report")
@SecurityRequirement(name = "bearer-key")
@Tag(name = "Reports")
public class ReportController {
  private final ReportService reportService;
  @Operation(summary = "create a new report", description = "Available  for the role USER.")
  @PostMapping()
  public ResponseEntity<?> create(@RequestBody @Valid ReportReq req){
    ReportRes response = this.reportService.create(req);
    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ApiResponse<>(response));
  }

  @Operation(summary = "Get all report", description = "return data with pagination, Available  for the role USER.")
  @GetMapping()
  public ResponseEntity<?> getAll(Pageable page){
    var response = this.reportService.getAll(page);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Get by id", description = "Available for the role USER.")
  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable Long id){
    var response = this.reportService.getById(id);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Delete report by id", description = "Available  for the role USER.")
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteById(@PathVariable long id){
    var response = this.reportService.deleteById(id);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Update report by id", description = " Available  for the role USER.")
  @PutMapping("/{id}")
  public ResponseEntity<?> updateById(@RequestBody @Valid ReportReq reportReq,
                                      @PathVariable long id) {
    var response = this.reportService.updateById(reportReq, id);
    return ResponseEntity.ok(new ApiResponse<>(response));
  }
}
