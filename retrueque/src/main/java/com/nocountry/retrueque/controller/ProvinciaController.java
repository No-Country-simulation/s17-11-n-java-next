package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.response.ProvinciaRes;
import com.nocountry.retrueque.service.interfaces.ProvinciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.base}/provincias")
@RequiredArgsConstructor
public class ProvinciaController {

    private final ProvinciaService provinciaService;

    @GetMapping
    public ResponseEntity<?> getAllProvincias() {
        List<ProvinciaRes> provincias = provinciaService.getAllProvincias();
        return ResponseEntity.ok(new ApiResponse<>(provincias));
    }
}
