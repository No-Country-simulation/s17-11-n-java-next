package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.exception.CategoryNotFoundException;
import com.nocountry.retrueque.model.dto.request.ServiceReq;
import com.nocountry.retrueque.model.dto.response.ServiceRes;
import com.nocountry.retrueque.model.dto.response.ServiceResShort;
import com.nocountry.retrueque.model.entity.Category;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.model.entity.Shift;
import com.nocountry.retrueque.model.entity.ShiftTimeByShift;
import com.nocountry.retrueque.model.enums.Day;
import com.nocountry.retrueque.repository.CategoryRepository;
import com.nocountry.retrueque.service.interfaces.S3FileUploadService;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {
        CategoryMapper.class,
        UserMapper.class,
        ShiftMapper.class
})
public interface ServiceMapper {

  @Mapping(target = "category", source = "categoryId")
  @Mapping(target ="shift", source = "days")
  Services reqToEntity(ServiceReq req, @Context CategoryRepository categoryRepository,
                       @Context S3FileUploadService s3FileUploadService);

  @Mapping(target = "days", source = "shift.days")
  @Mapping(target = "shiftTime", source = "shift.shifts")
  ServiceRes entityToRes(Services service);
  default Category map(Integer id, @Context CategoryRepository categoryRepository){
    return categoryRepository.findById(id.longValue())
            .orElseThrow(()->new CategoryNotFoundException(id));
  }

  ServiceResShort entityToShort(Services service);

  default String map(Set<MultipartFile> images, @Context S3FileUploadService s3FileUploadService){
    return images.stream()
            .map(s3FileUploadService::uploadFile)
            .collect(Collectors.joining(","));
  }
  default Shift map(Set<Integer> days){
    var daysString = days.stream()
            .map(item -> Day.fromId(item).name())
            .collect(Collectors.joining("-"));
    return new Shift(daysString);
  }

  default List<Integer> mapDay(String days){
    return Arrays.stream(days.split("-"))
            .map(item->Day.fromName(item).getId())
            .sorted()
            .toList();
  }

  default List<Integer> mapShiftTime(List<ShiftTimeByShift> shifts){
    return shifts.stream()
            .map(item->item.getShiftTime().getId())
            .sorted()
            .toList();
  }
}
