package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.dto.response.DepartamentoRes;
import com.nocountry.retrueque.model.entity.DepartamentoEntity;
import com.nocountry.retrueque.model.mapper.DepartamentoMapper;
import com.nocountry.retrueque.repository.DepartamentoRepository;
import com.nocountry.retrueque.service.interfaces.DepartamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartamentoServiceImp implements DepartamentoService {

    private final DepartamentoRepository departamentoRepository;
    private final DepartamentoMapper departamentoMapper;

    @Override
    public List<DepartamentoRes> getDepartamentosByProvinciaId(Long provinciaId) {
        List<DepartamentoEntity> departamentos = departamentoRepository.findByProvinciaId(provinciaId);
        return departamentos.stream()
                .map(departamentoMapper::toDepartamentoResponseDTO)
                .collect(Collectors.toList());
    }
}
