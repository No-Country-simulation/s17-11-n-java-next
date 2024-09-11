package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.dto.request.UserReq;
import com.nocountry.retrueque.model.dto.response.UserRes;
import com.nocountry.retrueque.model.dto.response.UserServicesRes;
import com.nocountry.retrueque.model.entity.UserEntity;

public interface UserService {
  UserRes create (UserReq user);
  UserRes getById(long id);
  UserRes updateById(UserReq user, long id);
  String softDeleteById(long id);

  UserEntity getByEmail(String email);

  UserServicesRes getUserWithServices(Long userId);
}
