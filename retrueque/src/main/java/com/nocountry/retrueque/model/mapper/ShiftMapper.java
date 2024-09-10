package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.request.ShiftReq;
import com.nocountry.retrueque.model.dto.response.ShiftRes;
import com.nocountry.retrueque.model.entity.Shift;
import com.nocountry.retrueque.model.entity.ShiftTimeByShift;
import com.nocountry.retrueque.model.enums.Day;
import com.nocountry.retrueque.model.enums.ShiftTime;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ShiftMapper {
  @Mapping(target = "days", source = "days")
  @Mapping(target = "shifts", source = "shiftTime")
  Shift reqToEntity(ShiftReq req);

  @Mapping(target = "days", source = "days")
  @Mapping(target = "shifts", source = "shifts")
  ShiftRes entityToRes(Shift shift);

  default String mapDay(Set<Integer> days) {
    return days.stream()
            .map(item -> Day.fromId(item).name())
            .collect(Collectors.joining("-"));
  }

  default List<ShiftTimeByShift> mapShiftTime(Set<Integer> shiftTimes) {
    return shiftTimes.stream()
            .map(id -> {
              var newShiftTime = new ShiftTimeByShift();
              newShiftTime.setShiftTime(ShiftTime.fromId(id));
              return newShiftTime;
            }).toList();
  }
  default Set<Integer> mapDay(String days){
    return Arrays.stream(days.split("-"))
            .map(item->Day.fromName(item).getId())
            .collect(Collectors.toSet());
  }

  default Set<Integer> mapShiftTime(List<ShiftTimeByShift> shifts){
    return shifts.stream()
            .map(item->item.getShiftTime().getId())
            .collect(Collectors.toSet());
  }
}
