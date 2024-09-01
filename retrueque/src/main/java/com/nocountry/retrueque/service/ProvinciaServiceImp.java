package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.dto.response.ProvinciaRes;
import com.nocountry.retrueque.model.mapper.ProvinciaMapper;
import com.nocountry.retrueque.repository.ProvinciaRepository;
import com.nocountry.retrueque.service.interfaces.ProvinciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProvinciaServiceImp implements ProvinciaService {

    private final ProvinciaRepository provinciaRepository;
    private final ProvinciaMapper provinciaMapper;

    @Override
    public List<ProvinciaRes> getAllProvincias() {
        return provinciaRepository.findAll().stream()
                .map(provinciaMapper::toProvinciaRes)
                .collect(Collectors.toList());
    }
}
