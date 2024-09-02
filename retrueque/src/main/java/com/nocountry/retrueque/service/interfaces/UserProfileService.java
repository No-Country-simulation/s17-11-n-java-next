package com.nocountry.retrueque.service.interfaces;


import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import jakarta.transaction.Transactional;


public interface UserProfileService {


    boolean isUserProfileFilled(Long idUser);

    @Transactional
    UserProfileRes createUserProfile(String email, UserProfileReq userProfileReq);

    UserProfileRes getUserProfileById(Long id);

    UserProfileRes updateUserProfile(String user, UserProfileReq userProfileReq);


}
