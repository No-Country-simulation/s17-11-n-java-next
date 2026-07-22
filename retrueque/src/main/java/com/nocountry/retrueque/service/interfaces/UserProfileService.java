package com.nocountry.retrueque.service.interfaces;


import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;


public interface UserProfileService {





    UserProfileRes getUserProfile();

    UserProfileRes updateUserProfile(UserProfileReq userProfileReq);


}
