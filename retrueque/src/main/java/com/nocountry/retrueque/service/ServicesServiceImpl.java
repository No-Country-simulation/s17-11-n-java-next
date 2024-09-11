package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.ServicesNotFoundException;
import com.nocountry.retrueque.model.dto.request.ServiceReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.ServiceRes;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.model.entity.ShiftTimeByShift;
import com.nocountry.retrueque.model.enums.ShiftTime;
import com.nocountry.retrueque.model.mapper.PageMapper;
import com.nocountry.retrueque.model.mapper.ServiceMapper;
import com.nocountry.retrueque.repository.CategoryRepository;
import com.nocountry.retrueque.repository.ServiceRepository;
import com.nocountry.retrueque.service.interfaces.AuthService;
import com.nocountry.retrueque.service.interfaces.S3FileUploadService;
import com.nocountry.retrueque.service.interfaces.ServicesService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ServicesServiceImpl implements ServicesService {
  private final ServiceRepository serviceRepository;
  private final CategoryRepository categoryRepo;
  private final ServiceMapper serviceMapper;
  private final PageMapper pageMapper;
  private final AuthService authService;
  private final S3FileUploadService s3Service;


  @Override
  @Transactional
  public ServiceRes create(ServiceReq service) {
    var newService = this.serviceMapper.reqToEntity(service, categoryRepo, s3Service);
    newService.setUser(this.authService.getAuthUser());
    newService.setDepartamento(newService.getUser().getProfile().getDepartamento());
    var shiftTimes = service.shiftTime()
            .stream()
            .map(id -> {
              var newShiftTime = new ShiftTimeByShift();
              newShiftTime.setShiftTime(ShiftTime.fromId(id));
              newShiftTime.setShift(newService.getShift());
              return newShiftTime;
            }).toList();
    newService.getShift().setShifts(shiftTimes);
    var serviceFound = this.serviceRepository.save(newService);
    return this.serviceMapper.entityToRes(serviceFound);
  }

  @Override
  public CustomPage<ServiceRes> getAll(Pageable pageable,
                                       Integer departamentoId,
                                       Integer provinciaId,
                                       Integer categoryId) {
    Page<Services> pageResult = this.serviceRepository.findAllByFilter(pageable,
            departamentoId, provinciaId, categoryId);
    Page<ServiceRes> pageResultDto = pageResult.map(this.serviceMapper::entityToRes);
    return this.pageMapper.pageService(pageResultDto);
  }

  @Override
  public ServiceRes getById(long id) {
    var serviceFound = this.serviceRepository.findById(id)
            .orElseThrow(()->new ServicesNotFoundException(id));
    return this.serviceMapper.entityToRes(serviceFound);
  }

  @Override
  public ServiceRes updateById(ServiceReq service, long id) {
    this.verifyIsExist(id);
    var newService = this.serviceMapper.reqToEntity(service, categoryRepo,s3Service);
    newService.setUser(this.authService.getAuthUser());
    var serviceFound = this.serviceRepository.save(newService);
    return this.serviceMapper.entityToRes(serviceFound);
  }

  @Override
  public String deleteById(long id) {
    this.verifyIsExist(id);
    this.serviceRepository.deleteById(id);
    return "Service deleted, id: "+id;
  }

  private void verifyIsExist(long id){
    boolean isExist = this.serviceRepository.existsById(id);
    if(!isExist) throw new ServicesNotFoundException(id);
  }
}
