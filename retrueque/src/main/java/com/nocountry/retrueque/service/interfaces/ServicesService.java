package com.nocountry.retrueque.service.interfaces;


import com.nocountry.retrueque.model.dto.request.ServiceReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.ServiceRes;
import org.springframework.data.domain.Pageable;

import java.util.Set;

public interface ServicesService {
  ServiceRes create (ServiceReq service);
  Set<ServiceRes> getAllByUserId(Long id);
  CustomPage<ServiceRes> getAll(Pageable pageable,
                                Integer departamentoId,
                                Integer provinciaId,
                                Integer categoryId);

  ServiceRes getById(long id);
  ServiceRes updateById(ServiceReq service, long id);
  String deleteById(long id);
}
