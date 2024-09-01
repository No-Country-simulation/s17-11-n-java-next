package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.dto.request.LoginReq;
import com.nocountry.retrueque.model.dto.request.UserReq;
import com.nocountry.retrueque.model.dto.response.LoginRes;
import com.nocountry.retrueque.model.dto.response.UserRes;
import com.nocountry.retrueque.model.entity.UserEntity;

public interface AuthService {
  LoginRes login(LoginReq loginReq);
  UserRes regist(UserReq userReq);
  UserEntity getAuthUser();
}
