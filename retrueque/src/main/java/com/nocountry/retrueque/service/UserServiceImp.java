package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.RoleNotFoundException;
import com.nocountry.retrueque.exception.UserEmailNotFoundException;
import com.nocountry.retrueque.exception.UserNotFoundException;
import com.nocountry.retrueque.model.dto.request.UserReq;
import com.nocountry.retrueque.model.dto.response.UserRatingInfoRes;
import com.nocountry.retrueque.model.dto.response.UserRes;
import com.nocountry.retrueque.model.entity.Role;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import com.nocountry.retrueque.model.mapper.UserMapper;
import com.nocountry.retrueque.repository.RoleRepository;
import com.nocountry.retrueque.repository.UserProfileRepository;
import com.nocountry.retrueque.repository.UserRepository;
import com.nocountry.retrueque.service.interfaces.TokenService;
import com.nocountry.retrueque.service.interfaces.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImp implements UserService {
  private final UserMapper userMapper;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenService tokenService;
  private final EmailServiceImp emailServiceImp;
  private final RoleRepository roleRepository;
  private final UserProfileRepository userProfileRepository;


  @Value("${email.link.confirmation}")
  private String linkConfirmation;

  @Override
  @Transactional
  public UserRes create(UserReq user) {
    UserEntity newUser = this.userMapper.reqToEntity(user);
    newUser.setPassword(passwordEncoder.encode(user.password()));

    Role defaultRole = roleRepository.findByName("USER")
            .orElseThrow(() -> new RoleNotFoundException("Rol de usuario no encontrado"));
    newUser.setRole(defaultRole);
    var savedUser = this.userRepository.save(newUser);

    String token = tokenService.createVerificationToken(savedUser);

    Map<String, Object> templateModel = new HashMap<>();
    templateModel.put("name", user.name()+" "+user.last_name());
    templateModel.put("confirmationUrl", linkConfirmation+token);
    emailServiceImp.sendEmail(savedUser.getEmail(),"¡Casi terminamos! Confirma tu email para empezar a soicitar o publicar tus servicios.",templateModel,"confirm-email");

    UserProfileEntity profile = new UserProfileEntity();
    profile.setUser(savedUser);
    userProfileRepository.save(profile);

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
            .orElseThrow(()->new UserEmailNotFoundException(email));

  }

  @Override
  public UserRatingInfoRes getUserWithRating(Long userId) {
    UserEntity user = this.userRepository.findById(userId)
            .orElseThrow(()-> new UserNotFoundException(String.valueOf(userId)));
    return this.userRepository.findUserRatingInfoByUserId(user.getId());
  }

  private void verifyIsExist(long id){
    boolean isExist = this.userRepository.existsById(id);
    if(!isExist) throw new UserNotFoundException(String.valueOf(id));
  }
}
