package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.entity.DepartamentoEntity;
import com.nocountry.retrueque.model.entity.ProvinciaEntity;
import com.nocountry.retrueque.model.entity.Request;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class RequestMapperTest {
    private final RequestMapper mapper = Mappers.getMapper(RequestMapper.class);
    private Request request;

    @BeforeEach
    void setUp() {
        request = mock(Request.class);
        Services service = mock(Services.class);
        UserEntity requester = mock(UserEntity.class);
        UserEntity provider = mock(UserEntity.class);
        UserProfileEntity requesterProfile = mock(UserProfileEntity.class);
        UserProfileEntity providerProfile = mock(UserProfileEntity.class);
        DepartamentoEntity requesterDepartment = mock(DepartamentoEntity.class);
        DepartamentoEntity providerDepartment = mock(DepartamentoEntity.class);
        ProvinciaEntity requesterProvince = mock(ProvinciaEntity.class);
        ProvinciaEntity providerProvince = mock(ProvinciaEntity.class);

        when(request.getId()).thenReturn(41L);
        when(request.getDescription()).thenReturn("Quiero intercambiar servicios");
        when(request.getDate()).thenReturn(LocalDate.of(2026, 7, 21));
        when(request.getUserOrigin()).thenReturn(requester);
        when(request.getServiceTarget()).thenReturn(service);
        when(service.getId()).thenReturn(2001L);
        when(service.getTitle()).thenReturn("Reparacion de paredes");
        when(service.getUser()).thenReturn(provider);

        when(requester.getId()).thenReturn(2002L);
        when(requester.getName()).thenReturn("John");
        when(requester.getLast_name()).thenReturn("Doe");
        when(requester.getProfile()).thenReturn(requesterProfile);
        when(requesterProfile.getDepartamento()).thenReturn(requesterDepartment);
        when(requesterDepartment.getProvincia()).thenReturn(requesterProvince);
        when(requesterDepartment.getName()).thenReturn("Capital");
        when(requesterProvince.getName()).thenReturn("Mendoza");

        when(provider.getId()).thenReturn(2003L);
        when(provider.getName()).thenReturn("Jane");
        when(provider.getLast_name()).thenReturn("Smith");
        when(provider.getProfile()).thenReturn(providerProfile);
        when(providerProfile.getDepartamento()).thenReturn(providerDepartment);
        when(providerProfile.getPhone()).thenReturn("+54 9 11 3456 7890");
        when(providerDepartment.getProvincia()).thenReturn(providerProvince);
        when(providerDepartment.getName()).thenReturn("Capital");
        when(providerProvince.getName()).thenReturn("Mendoza");
    }

    @Test
    void pendingRequestHidesProviderPhoneAndIncludesService() {
        when(request.getIsConfirm()).thenReturn(null);

        var response = mapper.toRequestRes(request);

        assertNull(response.provider().phone());
        assertEquals(2001L, response.service().id());
        assertEquals("Reparacion de paredes", response.service().title());
        assertEquals(2002L, response.user().id());
        assertEquals(2003L, response.provider().id());
    }

    @Test
    void confirmedRequestIncludesProviderPhone() {
        when(request.getIsConfirm()).thenReturn(true);

        var response = mapper.toRequestRes(request);

        assertEquals("+54 9 11 3456 7890", response.provider().phone());
    }
}
