package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.model.entity.DepartamentoEntity;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import com.nocountry.retrueque.model.mapper.UserProfileMapper;
import com.nocountry.retrueque.repository.DepartamentoRepository;
import com.nocountry.retrueque.repository.UserProfileRepository;
import com.nocountry.retrueque.repository.UserRepository;
import com.nocountry.retrueque.security.AuthenticationFacade;
import com.nocountry.retrueque.service.interfaces.UserProfileService;
import com.nocountry.retrueque.service.interfaces.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImp implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;
    private final UserProfileMapper userProfileMapper;
    private final DepartamentoRepository departamentoRepository;
    private final UserService userService;

    @Override
    @Transactional
    public UserProfileRes createUserProfile(String email, UserProfileReq userProfileReq) {
        UserEntity user = userService.getByEmail(email);
        validateUserProfileDoesNotExist(user);

        UserProfileEntity userProfile = userProfileMapper.toEntity(userProfileReq);
        userProfile.setUser(user);

        setDepartamentoIfPresent(userProfile, userProfileReq.departamento_id());
        return saveAndMapToResponse(userProfile);
    }

    @Override
    public UserProfileRes getUserProfileById(Long id) {
        return userProfileRepository.findById(id)
                .map(userProfileMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Perfil de usuario no encontrado"));
    }

    @Override
    @Transactional
    public UserProfileRes updateUserProfile(String username, UserProfileReq updateReq) {
        UserEntity user = userService.getByEmail(username);
        UserProfileEntity userProfile = findUserProfileByUser(user);

        // Actualizar campos del perfil
        updateUserProfileFields(user ,userProfile, updateReq);

        userRepository.save(user);

        return saveAndMapToResponse(userProfile);
    }

    @Override
    public boolean isUserProfileFilled(Long idUser) {
        // Implementación según requisitos
        return false;
    }


    private void validateUserProfileDoesNotExist(UserEntity user) {
        if (user.getProfile() != null) {
            throw new RuntimeException("El usuario ya tiene un perfil creado");
        }
    }

    private void setDepartamentoIfPresent(UserProfileEntity userProfile, Long departamentoId) {
        if (departamentoId != null) {
            DepartamentoEntity departamento = departamentoRepository.findById(departamentoId)
                    .orElseThrow(() -> new RuntimeException("Departamento no encontrado"));
            userProfile.setDepartamento(departamento);
        }
    }

    private UserProfileEntity findUserProfileByUser(UserEntity user) {
        return userProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Perfil de usuario no encontrado"));
    }

    private void updateUserProfileFields(UserEntity user,UserProfileEntity userProfile, UserProfileReq updateReq) {
        if (updateReq.profileImage() != null) userProfile.setProfile_image_url(updateReq.profileImage());
        if (updateReq.dniFrontImage() != null) userProfile.setDni_front_url(updateReq.dniFrontImage());
        if (updateReq.dniBackImage() != null) userProfile.setDni_back_url(updateReq.dniBackImage());
        if (updateReq.phone() != null) userProfile.setPhone(updateReq.phone());
        setDepartamentoIfPresent(userProfile, updateReq.departamento_id());

        //Actualizar tabla Users
        if (updateReq.name() != null && !updateReq.name().isBlank()) {
            user.setName(updateReq.name());
        }
        if (updateReq.lastname() != null && !updateReq.lastname().isBlank()) {
            user.setLast_name(updateReq.lastname());
        }
        //Se tiene que validar que el correo sea valido.
        if (updateReq.email() != null && !updateReq.email().isBlank()) {
            user.setEmail(updateReq.email());
        }
    }

    private UserProfileRes saveAndMapToResponse(UserProfileEntity userProfile) {
        UserProfileEntity savedProfile = userProfileRepository.save(userProfile);
        return userProfileMapper.toResponse(savedProfile);
    }


}

