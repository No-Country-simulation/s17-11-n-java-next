package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.request.UserReq;
import com.nocountry.retrueque.model.dto.response.UserRes;
import com.nocountry.retrueque.model.dto.response.UserResShort;
import com.nocountry.retrueque.model.entity.Role;
import com.nocountry.retrueque.model.entity.UserEntity;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserEntity reqToEntity(UserReq userReq);
  @Mapping(target = "username", expression = "java(user.getName()+ ' '+user.getLast_name())")
  UserResShort entityToShort(UserEntity user);

  UserRes entityToRes (UserEntity user);
}
