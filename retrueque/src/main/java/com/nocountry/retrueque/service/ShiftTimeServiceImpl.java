package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.entity.Shift;
import com.nocountry.retrueque.model.entity.ShiftTimeByShift;
import com.nocountry.retrueque.model.enums.ShiftTime;
import com.nocountry.retrueque.repository.ShiftTimeRepository;
import com.nocountry.retrueque.service.interfaces.ShiftTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ShiftTimeServiceImpl implements ShiftTimeService {
  private final ShiftTimeRepository shiftTimeRepository;

  @Override
  public List<ShiftTimeByShift> updateByShiftId(Shift shift, Set<Integer> shiftTimes){
    if(shiftTimes == null || shiftTimes.isEmpty()) return null;
    this.shiftTimeRepository.deleteAllByShiftId(shift.getId());
    List<ShiftTimeByShift> newShiftTimes = shiftTimes.stream()
            .map(id-> {
              var newShiftTime = new ShiftTimeByShift();
              newShiftTime.setShift(shift);
              newShiftTime.setShiftTime(ShiftTime.fromId(id));
              return newShiftTime;
            })
            .toList();
    return this.shiftTimeRepository.saveAll(newShiftTimes);
  }
}
