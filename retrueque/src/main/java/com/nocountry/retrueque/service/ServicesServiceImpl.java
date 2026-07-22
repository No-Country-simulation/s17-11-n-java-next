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
import com.nocountry.retrueque.service.interfaces.AuthService;
import com.nocountry.retrueque.service.interfaces.S3FileUploadService;
import com.nocountry.retrueque.service.interfaces.ServicesService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

  @Override
  @Transactional
  public ServiceRes updateById(ServiceReq service, long id) {
    var serviceFound = this.findByIdOrThrow(id);
    var currentUser = this.authService.getAuthUser();
    this.verifyOwnership(serviceFound, currentUser);

    serviceFound.setTitle(service.title());
    serviceFound.setDescription(service.description());
    serviceFound.setRules(service.rules());
    serviceFound.setCategory(this.serviceMapper.map(service.categoryId(), categoryRepo));
    serviceFound.setDepartamento(currentUser.getProfile().getDepartamento());

    if (service.imgUrl() != null && !service.imgUrl().isEmpty()) {
      serviceFound.setImgUrl(service.imgUrl().stream()
              .map(s3Service::uploadFile)
              .collect(Collectors.joining(",")));
    }

    this.updateShift(serviceFound, service);
    return this.serviceMapper.entityToRes(this.serviceRepository.save(serviceFound));
  }

  @Override
  @Transactional
  public String deleteById(long id) {
    var serviceFound = this.findByIdOrThrow(id);
    this.verifyOwnership(serviceFound, this.authService.getAuthUser());
    this.serviceRepository.delete(serviceFound);
    return "Service deleted, id: " + id;
  }

  private Services findByIdOrThrow(long id) {
    return this.serviceRepository.findById(id)
            .orElseThrow(() -> new ServicesNotFoundException(id));
  }

  private void verifyOwnership(Services service, com.nocountry.retrueque.model.entity.UserEntity currentUser) {
    if (!service.getUser().getId().equals(currentUser.getId())) {
      throw new com.nocountry.retrueque.exception.PermissionDeniedException(
              "No tienes permiso para modificar este servicio");
    }
  }

  private void updateShift(Services service, ServiceReq request) {
    var shift = service.getShift();
    if (shift == null) {
      shift = new com.nocountry.retrueque.model.entity.Shift();
      service.setShift(shift);
    }
    var serviceShift = shift;

    serviceShift.setDays(request.days().stream()
            .map(day -> com.nocountry.retrueque.model.enums.Day.fromId(day).name())
            .sorted()
            .collect(Collectors.joining("-")));

    var shiftTimes = request.shiftTime().stream()
            .map(id -> {
              var shiftTime = new ShiftTimeByShift();
              shiftTime.setShiftTime(ShiftTime.fromId(id));
              shiftTime.setShift(serviceShift);
              return shiftTime;
            })
            .collect(Collectors.toCollection(ArrayList::new));
    if (serviceShift.getShifts() == null) {
      serviceShift.setShifts(new ArrayList<>());
    } else {
      serviceShift.getShifts().clear();
    }
    serviceShift.getShifts().addAll(shiftTimes);
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
