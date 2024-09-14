package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.model.entity.DepartamentoEntity;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import com.nocountry.retrueque.model.mapper.UserProfileMapper;
import com.nocountry.retrueque.repository.DepartamentoRepository;
import com.nocountry.retrueque.repository.UserProfileRepository;
import com.nocountry.retrueque.security.AuthenticationFacade;
import com.nocountry.retrueque.service.interfaces.UserProfileService;
import com.nocountry.retrueque.service.interfaces.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImp implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserProfileMapper userProfileMapper;
    private final DepartamentoRepository departamentoRepository;
    private final UserService userService;
    private final AuthenticationFacade authenticationFacade;
    private final PasswordEncoder passwordEncoder;
    private final S3FileUploadServiceImp s3FileUploadService;


    @Override
    public UserProfileRes getUserProfile() {
        String email = authenticationFacade.getAuthenticatedUserEmail();

        return userProfileRepository.findByUserEmail(email)
                .map(userProfileMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Perfil de usuario no encontrado para el usuario con email: " + email));
    }

    @Override
    @Transactional
    public UserProfileRes updateUserProfile(UserProfileReq updateReq) {
        String email = authenticationFacade.getAuthenticatedUserEmail();
        UserProfileEntity userProfile = userProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Perfil de usuario no encontrado para el email: " + email));

        updateUserProfileFields(userProfile,updateReq);

        UserProfileEntity savedProfile = userProfileRepository.save(userProfile);
        return userProfileMapper.toResponse(savedProfile);
    }


    private void updateUserProfileFields(UserProfileEntity userProfile, UserProfileReq updateReq) {
        if (updateReq.profileImage() != null) {
            userProfile.setProfile_image_url(s3FileUploadService.uploadFile(updateReq.profileImage()));
        }
        if (updateReq.dniFrontImage() != null) {
            userProfile.setDni_front_url(s3FileUploadService.uploadFile(updateReq.dniFrontImage()));
        }
        if (updateReq.dniBackImage() != null) {
            userProfile.setDni_back_url(s3FileUploadService.uploadFile(updateReq.dniBackImage()));
        }
        if (updateReq.phone() != null && !updateReq.phone().isBlank()) {
            userProfile.setPhone(updateReq.phone());
        }

        DepartamentoEntity departamento = departamentoRepository.findById(updateReq.departamento_id())
                .orElseThrow(() -> new RuntimeException("Departamento no encontrado con id: " + updateReq.departamento_id()));
        userProfile.setDepartamento(departamento);

        // Actualizar campos de UserEntity
        if (updateReq.name() != null && !updateReq.name().isBlank()) {
            userProfile.getUser().setName(updateReq.name());
        }
        if (updateReq.lastname() != null && !updateReq.lastname().isBlank()) {
            userProfile.getUser().setLast_name(updateReq.lastname());
        }
        if (updateReq.email() != null && !updateReq.email().isBlank()) {
            // Podrías añadir aquí una validación de email existente
            userProfile.getUser().setEmail(updateReq.email());
        }
        if (updateReq.password() != null && !updateReq.password().isBlank()) {
            userProfile.getUser().setPassword(passwordEncoder.encode(updateReq.password()));
        }
    }



}

