package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.UserNotFoundException;
import com.nocountry.retrueque.model.dto.request.UserReq;
import com.nocountry.retrueque.model.dto.response.UserRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.mapper.UserMapper;
import com.nocountry.retrueque.repository.UserRepository;
import com.nocountry.retrueque.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImp implements UserService {
  private final UserMapper userMapper;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public UserRes create(UserReq user) {
    UserEntity newUser = this.userMapper.reqToEntity(user);
    newUser.setPassword(passwordEncoder.encode(user.password()));
    var savedUser = this.userRepository.save(newUser);
    return this.userMapper.entityToRes(savedUser);
  }

  @Override
  public UserRes getById(long id) {
    var userFound = this.userRepository.findById(id)
            .orElseThrow(()-> new UserNotFoundException(String.valueOf(id)));
    return this.userMapper.entityToRes(userFound);
  }

  @Override
  public UserRes updateById(UserReq user, long id) {
    this.verifyIsExist(id);
    UserEntity newUser = this.userMapper.reqToEntity(user);
    newUser.setId(id);
    var updatedUser = this.userRepository.save(newUser);
    return this.userMapper.entityToRes(updatedUser);
  }

  @Override
  public String softDeleteById(long id) {
    this.verifyIsExist(id);
    this.userRepository.softDelete(id);
    return "User deleted successfully, id:"+id;
  }

  @Override
  public UserEntity getByEmail(String email){
    return this.userRepository.findByEmail(email)
            .orElseThrow(()->new UserNotFoundException(email));

  }

  private void verifyIsExist(long id){
    boolean isExist = this.userRepository.existsById(id);
    if(!isExist) throw new UserNotFoundException(String.valueOf(id));
  }
}
