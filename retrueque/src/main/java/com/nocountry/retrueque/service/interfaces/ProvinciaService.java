package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.dto.response.ProvinciaRes;
import com.nocountry.retrueque.model.entity.ProvinciaEntity;

import java.util.List;

public interface ProvinciaService {

    List<ProvinciaRes> getAllProvincias();
}
