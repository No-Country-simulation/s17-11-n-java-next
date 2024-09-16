package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.request.RequestCommentReq;
import com.nocountry.retrueque.model.dto.request.RequestReq;
import com.nocountry.retrueque.model.dto.request.RequestUpdateReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.RequestCommentsRes;
import com.nocountry.retrueque.model.dto.response.RequestMesRes;
import com.nocountry.retrueque.model.dto.response.RequestRes;
import com.nocountry.retrueque.service.interfaces.RequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("${api.base}/requests")
@RequiredArgsConstructor
@Tag(name = "Requests")
@SecurityRequirement(name = "bearer-key")
public class RequestController {

    private final RequestService requestService;

    @Operation(summary = "Get request by id", description = "It is only visible to the user who made the request or the one who received it.")
    @GetMapping("/{id}")
    public ResponseEntity<RequestRes> getRequest(@PathVariable Long id) {
        RequestRes requestRes = this.requestService.findById(id);
        return ResponseEntity.ok(requestRes);
    }

    @Operation(summary = "Create request")
    @PostMapping
    public ResponseEntity<?> createRequest(@Valid @RequestBody RequestReq request) {
        RequestMesRes requestRes = this.requestService.create(request);
        return ResponseEntity.ok().body(new ApiResponse<>(requestRes));
    }

    @Operation(summary = "Update request by id", description = "This request can only be updated by the user who received it.")
    @PutMapping("/{id}")
    public  ResponseEntity<?> updateRequest(@PathVariable Long id, @Valid @RequestBody RequestUpdateReq request) {
        RequestMesRes requestRes = this.requestService.update(id, request);
        return ResponseEntity.ok().body(new ApiResponse<>(requestRes));
    }

    @Operation(summary = "Get all the requests initiated by the user")
    @GetMapping("/sent")
    public ResponseEntity<?> getAllRequestsSent() {
        List<RequestRes> requestRes = this.requestService.getRequestsMadeByUser();
        return ResponseEntity.ok().body(new ApiResponse<>(requestRes));

    }

    @Operation(summary = "Get all the requests received by the user")
    @GetMapping("/received")
    public ResponseEntity<?> getAllRequestsRecived() {
        List<RequestRes> requestRes = this.requestService.getRequestsReceivedByUser();
        return ResponseEntity.ok().body(new ApiResponse<>(requestRes));

    }

    @Operation(summary = "Get all the comments received by the user")
    @GetMapping("/comments/user/{userId}")
    public ResponseEntity<?> getReceivedCommentsByUserId(@PathVariable Long userId, Pageable pageable) {
       CustomPage<RequestCommentsRes> response = requestService.getReceivedCommentsByUserId(userId, pageable);
       return ResponseEntity.ok(new ApiResponse<>(response));
   }

    @Operation(summary = "Get comment for id")
    @GetMapping("/comments/{id}")
    public ResponseEntity<?> getComment(@PathVariable Long id) {
        RequestCommentsRes response = requestService.getCommentById(id);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @Operation(summary = "Add comment and rating")
    @PutMapping("/comments/{id}")
    public ResponseEntity<?> getComment(@PathVariable Long id, @RequestBody @Valid RequestCommentReq request) {
        RequestCommentsRes response = requestService.updateCommentById(id, request);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }


}
