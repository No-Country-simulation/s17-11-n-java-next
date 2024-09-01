package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import com.nocountry.retrueque.model.mapper.UserProfileMapper;
import com.nocountry.retrueque.repository.DepartamentoRepository;
import com.nocountry.retrueque.repository.UserProfileRepository;
import com.nocountry.retrueque.repository.UserRepository;
import com.nocountry.retrueque.security.AuthenticationFacade;
import com.nocountry.retrueque.service.interfaces.UserProfileService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileImp implements UserProfileService {

    private final UserProfileRepository userDetailsRepository;
    private final UserRepository userRepository;
    private final AuthenticationFacade authenticationFacade;
    private final UserProfileRepository userProfileRepository;
    private final UserProfileMapper userProfileMapper;
    private final DepartamentoRepository departamentoRepository;

    @Override
    @Transactional
    public UserProfileRes createUserProfile(UserProfileReq userProfileReq) {
        String email = authenticationFacade.getAuthenticatedUserEmail();

        // Obtener el usuario autenticado
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verificar si ya tiene un UserProfile
        if (user.getProfile() != null) {
            throw new RuntimeException("El usuario ya tiene un perfil creado");
        }

        // Mapear el DTO a la entidad UserProfile usando el mapper
        UserProfileEntity userProfile = userProfileMapper.toEntity(userProfileReq);

        // Asignar el UserEntity al UserProfile
        userProfile.setUser(user);

        // Asignar el Departamento al UserProfile (si es necesario)
        userProfile.setDepartamento(
                departamentoRepository.findById(userProfileReq.departamento_id())
                        .orElseThrow(() -> new RuntimeException("Departamento no encontrado"))
        );

        userProfile = userProfileRepository.save(userProfile);

        // Mapear a UserProfileResponse usando el mapper
        return userProfileMapper.toResponse(userProfile);
    }

    @Override
    public boolean isUserProfileFilled(Long idUser) {
        return false;
    }
}
