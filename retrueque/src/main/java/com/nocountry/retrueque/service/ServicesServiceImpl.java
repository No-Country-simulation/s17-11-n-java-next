package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.InvalidPaginationParameterException;
import com.nocountry.retrueque.exception.ServiceException;
import com.nocountry.retrueque.exception.ServicesNotFoundException;
import com.nocountry.retrueque.model.dto.request.ServiceReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.ServiceRes;
import com.nocountry.retrueque.model.entity.DepartamentoEntity;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.model.entity.ShiftTimeByShift;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import com.nocountry.retrueque.model.enums.ShiftTime;
import com.nocountry.retrueque.model.mapper.PageMapper;
import com.nocountry.retrueque.model.mapper.ServiceMapper;
import com.nocountry.retrueque.repository.CategoryRepository;
import com.nocountry.retrueque.repository.DepartamentoRepository;
import com.nocountry.retrueque.repository.ServiceRepository;
import com.nocountry.retrueque.service.interfaces.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ServicesServiceImpl implements ServicesService {
  private final ServiceRepository serviceRepository;
  private final DepartamentoRepository departamentoRepository;
  private final CategoryRepository categoryRepo;
  private final ServiceMapper serviceMapper;
  private final PageMapper pageMapper;
  private final AuthService authService;
  private final S3FileUploadService s3Service;
  private final ShiftTimeService shiftTimeService;
  private final ShiftService shiftService;
  private final EntityManager entityManager;


  @Override
  @Transactional
  public ServiceRes create(ServiceReq service) {
    var newService = this.serviceMapper.reqToEntity(service, categoryRepo, s3Service);
    var currentUser = this.authService.getAuthUser();
    newService.setUser(currentUser);
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
    this.isValidUser(currentUser.getProfile());
    try {
      var serviceFound = this.serviceRepository.save(newService);
      return this.getServiceResWithProvincia(serviceFound);
    } catch (PropertyReferenceException err) {
      throw new InvalidPaginationParameterException(" Invalid pagination parameter"+err.getPropertyName());
    }
  }

  @Override
  public Set<ServiceRes> getAllByUserId(Long id) {
    return this.serviceRepository.findByUserId(id)
            .stream()
            .map(this.serviceMapper::entityToRes)
            .collect(Collectors.toSet());
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
            .orElseThrow(() -> new ServicesNotFoundException(id));
    return this.serviceMapper.entityToRes(serviceFound);
  }

  @Transactional
  @Override
  public ServiceRes updateById(ServiceReq service, long id) {
    Services oldService = this.serviceRepository.findById(id)
            .orElseThrow(()-> new ServicesNotFoundException(id));
    this.serviceMapper.updateServiceFromReq(service, oldService, this.categoryRepo, this.s3Service);
    this.serviceRepository.save(oldService);
    this.shiftService.updateByServiceAndId(service.days(), oldService.getShift().getId());
    this.shiftTimeService.updateByShiftId(oldService.getShift(), service.shiftTime());
//    entityManager.clear();
    return this.getById(id);
  }

  @Override
  public String deleteById(long id) {
    this.verifyIsExist(id);
    this.serviceRepository.deleteById(id);
    return "Service deleted, id: " + id;
  }

  private void verifyIsExist(long id) {
    boolean isExist = this.serviceRepository.existsById(id);
    if (!isExist) throw new ServicesNotFoundException(id);
  }

  private void isValidUser(UserProfileEntity profile) {
    if (profile.getDepartamento() == null ||
            profile.getId() == null ||
            profile.getUser() == null ||
            profile.getPhone() == null ||
            profile.getDni_back_url() == null ||
            profile.getDni_front_url() == null) {
      throw new ServiceException("the user profile must by completed.");
    }
  }

  private ServiceRes getServiceResWithProvincia(Services service) {
    if (service.getDepartamento() != null) {
      DepartamentoEntity departamento = departamentoRepository.findByIdWithProvincia(service.getDepartamento().getId())
              .orElseThrow(() -> new EntityNotFoundException(service.getDepartamento().getId().toString()));
      service.setDepartamento(departamento);
    }
    return serviceMapper.entityToRes(service);
  }
}
