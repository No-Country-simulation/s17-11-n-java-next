package com.nocountry.retrueque.service.interfaces;


import com.nocountry.retrueque.model.dto.request.ServiceReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.ServiceRes;
import org.springframework.data.domain.Pageable;

public interface ServicesService {
  ServiceRes create (ServiceReq service);
  CustomPage<ServiceRes> getAll(Pageable pageable);
  ServiceRes getById(long id);
  ServiceRes updateById(ServiceReq service, long id);
  String deleteById(long id);
}
