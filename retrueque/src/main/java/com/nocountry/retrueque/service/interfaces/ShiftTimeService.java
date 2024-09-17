package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.entity.Shift;
import com.nocountry.retrueque.model.entity.ShiftTimeByShift;

import java.util.List;
import java.util.Set;

public interface ShiftTimeService {
  List<ShiftTimeByShift> updateByShiftId(Shift shift, Set<Integer> shiftTimes);
}
