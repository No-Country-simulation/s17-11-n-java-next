package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.response.DepartamentoRes;
import com.nocountry.retrueque.service.interfaces.DepartamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.base}/departamentos")
@RequiredArgsConstructor
public class DepartamentoController {

    private final DepartamentoService departamentoService;

    @GetMapping("/provincia/{provinciaId}")
    public ResponseEntity<?> getDepartamentosByProvinciaId(@PathVariable Long provinciaId) {
        List<DepartamentoRes> departamentos = departamentoService.getDepartamentosByProvinciaId(provinciaId);
        return ResponseEntity.ok(departamentos);
    }

}
