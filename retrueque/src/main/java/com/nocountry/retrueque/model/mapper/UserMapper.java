package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.request.UserReq;
import com.nocountry.retrueque.model.dto.response.UserRes;
import com.nocountry.retrueque.model.entity.Role;
import com.nocountry.retrueque.model.entity.UserEntity;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring")
public interface UserMapper {

  @Mapping(target = "role", source = "roleId")
  UserEntity reqToEntity(UserReq userReq);
  UserRes entityToRes (UserEntity user);

  default Role map(long roleId){
    Role role = new Role();
    role.setId(roleId);
    return role;
  }
}