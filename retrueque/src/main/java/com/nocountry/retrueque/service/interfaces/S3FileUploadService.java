package com.nocountry.retrueque.service.interfaces;

import org.springframework.web.multipart.MultipartFile;

public interface S3FileUploadService {
    String uploadFile(MultipartFile file);
}
