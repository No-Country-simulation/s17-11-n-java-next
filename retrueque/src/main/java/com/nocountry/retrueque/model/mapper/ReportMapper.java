package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.exception.ServicesNotFoundException;
import com.nocountry.retrueque.model.dto.request.ReportReq;
import com.nocountry.retrueque.model.dto.response.ReportRes;
import com.nocountry.retrueque.model.entity.Report;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.model.enums.ReportStatus;
import com.nocountry.retrueque.repository.ServiceRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {
        ServiceMapper.class,
        UserMapper.class
})
public interface ReportMapper {

  @Mapping(target = "reportStatus", source = "reportStatus")
  @Mapping(target = "service", source = "serviceId")
  Report reqToEntity(ReportReq req, @Context ServiceRepository serviceRepository);

  @Mapping(target = "user", source = "user")
  @Mapping(target = "service", source = "service")
  @Mapping(target = "reportStatus", source = "reportStatus")
  ReportRes entityToRes(Report report);

  default Integer map(ReportStatus status) {
    return status.getId();
  }

  default ReportStatus map(Integer id) {
    return ReportStatus.fromId(id);
  }

  default Services map(long id, @Context ServiceRepository serviceRepository) {
        return serviceRepository.findById(id)
                .orElseThrow(()-> new ServicesNotFoundException(id));
  }

}
