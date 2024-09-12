package com.nocountry.retrueque.service.interfaces;


import com.nocountry.retrueque.model.dto.request.ShiftReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.ShiftRes;
import org.springframework.data.domain.Pageable;

public interface ShiftService {
  ShiftRes create (ShiftReq shift);
  CustomPage<ShiftRes> getAll(Pageable pageable);
  ShiftRes getById(long id);
  ShiftRes updateById(ShiftReq shift, long id);
  String deleteById(long id);
}
