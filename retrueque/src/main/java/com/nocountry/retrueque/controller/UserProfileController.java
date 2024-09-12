package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.service.interfaces.UserProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("${api.base}/user-profile")
@RequiredArgsConstructor
@Tag(name = "User Profile")
@SecurityRequirement(name = "bearer-key")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Operation(summary = "Get profile from user autenticate")
    @GetMapping()
    public ResponseEntity<ApiResponse<UserProfileRes>> getUserProfile() {
        UserProfileRes userProfile = userProfileService.getUserProfile();
        return Optional.ofNullable(userProfile)
                .map(profile -> ResponseEntity.ok(new ApiResponse<>(profile)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Update profile from user Autenticate")
    @PutMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<UserProfileRes>> updateUserProfile(@ModelAttribute @Valid UserProfileReq userProfileReq) {
        UserProfileRes updatedProfile = userProfileService.updateUserProfile(userProfileReq);
        return ResponseEntity.ok(new ApiResponse<>(updatedProfile));
    }

}


