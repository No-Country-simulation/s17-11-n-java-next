package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.service.interfaces.S3FileUploadService;
import com.nocountry.retrueque.service.interfaces.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/user-profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final S3FileUploadService s3FileUploadService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createUserProfile( @RequestParam("profileImage") MultipartFile profileImage,
                                                @RequestParam("dniFrontImage") MultipartFile dniFrontImage,
                                                @RequestParam("dniBackImage") MultipartFile dniBackImage,
                                                @RequestParam("phone") String phone,
                                                @RequestParam("departamentoId") long departamentoId){

        String profileImageUrl = s3FileUploadService.uploadFile(profileImage);
        String dniFrontImageUrl = s3FileUploadService.uploadFile(dniFrontImage);
        String dniBackImageUrl = s3FileUploadService.uploadFile(dniBackImage);

        UserProfileReq userProfileReq = new UserProfileReq(profileImageUrl, dniFrontImageUrl,
                                                dniBackImageUrl, phone, departamentoId);

        UserProfileRes response = userProfileService.createUserProfile(userProfileReq);
        return ResponseEntity.ok(new ApiResponse<UserProfileRes>(response));
    }

}
