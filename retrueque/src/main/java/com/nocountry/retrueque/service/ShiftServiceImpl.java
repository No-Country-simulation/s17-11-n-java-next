package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.ShiftNotFoundException;
import com.nocountry.retrueque.model.dto.request.ShiftReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.ShiftRes;
import com.nocountry.retrueque.model.entity.Shift;
import com.nocountry.retrueque.model.mapper.PageMapper;
import com.nocountry.retrueque.model.mapper.ShiftMapper;
import com.nocountry.retrueque.repository.ShiftRepository;
import com.nocountry.retrueque.service.interfaces.ShiftService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShiftServiceImpl implements ShiftService {
  private final ShiftRepository shiftRepository;
  private final ShiftMapper shiftMapper;
  private final PageMapper pageMapper;

  @Override
  public ShiftRes create(ShiftReq shift) {
    Shift newShift = this.shiftMapper.reqToEntity(shift);
    Shift savedShift = this.shiftRepository.save(newShift);
    return this.shiftMapper.entityToRes(savedShift);
  }

  @Override
  public CustomPage<ShiftRes> getAll(Pageable pageable) {
    Page<Shift> shifts = this.shiftRepository.findAll(pageable);
    Page<ShiftRes> shiftRes = shifts.map(this.shiftMapper::entityToRes);
    return this.pageMapper.pageShift(shiftRes);
  }

  @Override
  public ShiftRes getById(long id) {
    Shift shiftFound = this.shiftRepository.findById(id)
            .orElseThrow(()->new ShiftNotFoundException(id));
    return this.shiftMapper.entityToRes(shiftFound);
  }

  @Override
  public ShiftRes updateById(ShiftReq shift, long id) {
    this.verifyIsExist(id);
    Shift newShift = this.shiftMapper.reqToEntity(shift);
    newShift.setId(id);
    Shift savedShift = this.shiftRepository.save(newShift);
    return this.shiftMapper.entityToRes(savedShift);
  }

  @Override
  public String deleteById(long id) {
    this.verifyIsExist(id);
    this.shiftRepository.deleteById(id);
    return "Turno eliminado con éxito, id: "+id;
  }

  private void verifyIsExist(long id){
    boolean isExist = this.shiftRepository.existsById(id);
    if(!isExist) throw new ShiftNotFoundException(id);
  }
}
