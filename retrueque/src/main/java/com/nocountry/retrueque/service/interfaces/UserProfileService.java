package com.nocountry.retrueque.service.interfaces;


import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import jakarta.transaction.Transactional;


public interface UserProfileService {





    UserProfileRes getUserProfile();

    UserProfileRes updateUserProfile(UserProfileReq userProfileReq);


}
