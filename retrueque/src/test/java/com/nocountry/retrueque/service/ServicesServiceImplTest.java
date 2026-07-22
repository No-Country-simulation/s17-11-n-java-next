package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.PermissionDeniedException;
import com.nocountry.retrueque.model.dto.request.ServiceReq;
import com.nocountry.retrueque.model.dto.response.ServiceRes;
import com.nocountry.retrueque.model.entity.Category;
import com.nocountry.retrueque.model.entity.DepartamentoEntity;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import com.nocountry.retrueque.model.mapper.PageMapper;
import com.nocountry.retrueque.model.mapper.ServiceMapper;
import com.nocountry.retrueque.repository.CategoryRepository;
import com.nocountry.retrueque.repository.DepartamentoRepository;
import com.nocountry.retrueque.repository.ServiceRepository;
import com.nocountry.retrueque.service.interfaces.AuthService;
import com.nocountry.retrueque.service.interfaces.S3FileUploadService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ServicesServiceImplTest {

    @Mock private ServiceRepository serviceRepository;
    @Mock private DepartamentoRepository departamentoRepository;
    @Mock private CategoryRepository categoryRepository;
    @Mock private ServiceMapper serviceMapper;
    @Mock private PageMapper pageMapper;
    @Mock private AuthService authService;
    @Mock private S3FileUploadService s3FileUploadService;

    @InjectMocks private ServicesServiceImpl servicesService;

    private final ServiceReq request = new ServiceReq(
            "Clases de guitarra", "Clases para principiantes", "Llegar puntualmente", null,
            1, Set.of(1, 3), Set.of(1, 2));

    private Services service;
    private UserEntity owner;

    @BeforeEach
    void setUp() {
        owner = user(1L);
        service = new Services();
        service.setId(10L);
        service.setUser(owner);
    }

    @Test
    void updateRejectsAUserWhoDoesNotOwnTheService() {
        when(serviceRepository.findById(10L)).thenReturn(Optional.of(service));
        when(authService.getAuthUser()).thenReturn(user(2L));

        assertThrows(PermissionDeniedException.class,
                () -> servicesService.updateById(request, 10L));

        verify(serviceRepository, never()).save(any());
    }

    @Test
    void deleteRejectsAUserWhoDoesNotOwnTheService() {
        when(serviceRepository.findById(10L)).thenReturn(Optional.of(service));
        when(authService.getAuthUser()).thenReturn(user(2L));

        assertThrows(PermissionDeniedException.class,
                () -> servicesService.deleteById(10L));

        verify(serviceRepository, never()).delete((Services) any());
    }

    @Test
    void updateSavesTheExistingService() {
        Category category = new Category();
        UserEntity authenticatedOwner = user(1L);
        ServiceRes response = org.mockito.Mockito.mock(ServiceRes.class);

        when(serviceRepository.findById(10L)).thenReturn(Optional.of(service));
        when(authService.getAuthUser()).thenReturn(authenticatedOwner);
        when(serviceMapper.map(1, categoryRepository)).thenReturn(category);
        when(serviceRepository.save(service)).thenReturn(service);
        when(serviceMapper.entityToRes(service)).thenReturn(response);

        servicesService.updateById(request, 10L);

        verify(serviceRepository).save(service);
    }

    private UserEntity user(Long id) {
        UserEntity user = new UserEntity();
        user.setId(id);
        UserProfileEntity profile = new UserProfileEntity();
        profile.setDepartamento(new DepartamentoEntity());
        user.setProfile(profile);
        return user;
    }
}
