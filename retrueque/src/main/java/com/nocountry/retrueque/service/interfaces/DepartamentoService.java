package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.dto.response.DepartamentoRes;

import java.util.List;

public interface DepartamentoService {
    List<DepartamentoRes> getDepartamentosByProvinciaId(Long provinciaId);
}
