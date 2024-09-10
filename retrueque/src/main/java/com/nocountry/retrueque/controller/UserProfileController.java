package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.security.AuthenticationFacade;
import com.nocountry.retrueque.service.interfaces.S3FileUploadService;
import com.nocountry.retrueque.service.interfaces.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user-profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final S3FileUploadService s3FileUploadService;
    private final AuthenticationFacade authenticationFacade;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<UserProfileRes>> createUserProfile(
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam(value = "dniFrontImage", required = false) MultipartFile dniFrontImage,
            @RequestParam(value = "dniBackImage", required = false) MultipartFile dniBackImage,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "departamentoId", required = false) Long departamentoId,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "lastname", required = false) String lastname,
            @RequestParam(value = "email", required = false) String email) {

        String username = authenticationFacade.getAuthenticatedUserEmail();

        UserProfileReq userProfileReq = buildUserProfileReq(profileImage, dniFrontImage, dniBackImage, phone, departamentoId, name, lastname, email);

        UserProfileRes response = userProfileService.createUserProfile(username, userProfileReq);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserProfileRes>> getUserProfile(@PathVariable Long id) {
        UserProfileRes userProfile = userProfileService.getUserProfileById(id);
        return Optional.ofNullable(userProfile)
                .map(profile -> ResponseEntity.ok(new ApiResponse<>(profile)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<UserProfileRes>> updateUserProfile(
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam(value = "dniFrontImage", required = false) MultipartFile dniFrontImage,
            @RequestParam(value = "dniBackImage", required = false) MultipartFile dniBackImage,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "departamentoId", required = false) Long departamentoId,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "lastname", required = false) String lastname,
            @RequestParam(value = "email", required = false) String email) {

        String username = authenticationFacade.getAuthenticatedUserEmail();

        UserProfileReq updateReq = buildUserProfileReq(profileImage, dniFrontImage, dniBackImage, phone, departamentoId, name, lastname, email);
        UserProfileRes updatedProfile = userProfileService.updateUserProfile(username, updateReq);

        return ResponseEntity.ok(new ApiResponse<>(updatedProfile));
    }

    private UserProfileReq buildUserProfileReq(MultipartFile profileImage, MultipartFile dniFrontImage, MultipartFile dniBackImage,
                                               String phone, Long departamentoId, String name, String lastname, String email) {
        String profileImageUrl = (profileImage != null) ? s3FileUploadService.uploadFile(profileImage) : null;
        String dniFrontImageUrl = (dniFrontImage != null) ? s3FileUploadService.uploadFile(dniFrontImage) : null;
        String dniBackImageUrl = (dniBackImage != null) ? s3FileUploadService.uploadFile(dniBackImage) : null;

        return new UserProfileReq(profileImageUrl, dniFrontImageUrl, dniBackImageUrl, phone, departamentoId, name, lastname, email);
    }
}


