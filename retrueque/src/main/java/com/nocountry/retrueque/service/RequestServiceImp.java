package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.dto.request.RequestReq;
import com.nocountry.retrueque.model.dto.request.RequestUpdateReq;
import com.nocountry.retrueque.model.dto.response.RequestRes;
import com.nocountry.retrueque.model.entity.Request;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.model.entity.UserEntity;

import com.nocountry.retrueque.model.mapper.RequestMapper;
import com.nocountry.retrueque.repository.RequestRepository;
import com.nocountry.retrueque.repository.ServiceRepository;
import com.nocountry.retrueque.repository.UserRepository;
import com.nocountry.retrueque.security.AuthenticationFacade;
import com.nocountry.retrueque.service.interfaces.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RequestServiceImp implements RequestService {

    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;
    private final AuthenticationFacade authenticationFacade;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final EmailServiceImp emailService;


    @Override
    //Faltara validar que el usurio no pueda contratar su propio servicio
    //de momento queda asi ya que no creo que quieran crear dos cuentas para provar esta parte
    public RequestRes create(RequestReq requestReq) {
        String username = authenticationFacade.getAuthenticatedUserEmail();

        UserEntity user = this.userRepository.findByEmail(username).orElseThrow();
        Request request = this.requestMapper.toEntity(requestReq);
        request.setUserOrigin(user);

        Services service = this.serviceRepository.getReferenceById(requestReq.serviceId());
        request.setServiceTarget(service);

        Request saveRequest = this.requestRepository.save(request);
        emailService.sendEmail(service.getUser().getEmail(), "¡Has recibido una nueva solicitud de servicio!","Queremos informarte que has recibido una nueva solicitud de servicio en nuestra plataforma.\n\nPor favor, ingresa a tu cuenta para revisar los detalles y responder a la solicitud");

        return this.requestMapper.toRequestRes(saveRequest);
    }

    public RequestRes update(Long id, RequestUpdateReq requestUptdateReq) {
        Request request = this.requestRepository.findById(id).orElseThrow();

        String username = authenticationFacade.getAuthenticatedUserEmail();
        if (username.equals(request.getServiceTarget().getUser().getEmail())) {
            new RuntimeException("No tienes permitido aaceptar o cancelar esta petición");
        }

        request.setIsConfirm(requestUptdateReq.isConfirmed());
        Request requestSaved = requestRepository.save(request);
        if(requestUptdateReq.isConfirmed()) {
            emailService.sendEmail(requestSaved.getUserOrigin().getEmail(),
                    "Tu petición ha sido aceptada",
                    "¡Nos alegra informarte que tu petición para el servicio " +requestSaved.getServiceTarget().getTitle()+ " ha sido aceptada!.\nIngresa a la plataforma para poder establecer una comunicación con " + requestSaved.getServiceTarget().getUser().getName()+" "+requestSaved.getServiceTarget().getUser().getLast_name());

        }
        else {
            emailService.sendEmail(requestSaved.getUserOrigin().getEmail(),
                    "Tu petición ha sido rechazada",
                    "¡Lamentamos informarte que tu petición para el servicio " +requestSaved.getServiceTarget().getTitle()+ " rechazada!.\n No pierdas las esperanzas y entra a nuestra plataforma y busca otro prestador de servicios diferente");

        }

        return this.requestMapper.toRequestRes(requestSaved);
    }


    public RequestRes findById(Long id) {
        Request request = requestRepository.findById(id).orElseThrow();
        String email = request.getUserOrigin().getEmail();
        String username = authenticationFacade.getAuthenticatedUserEmail();
        if (!email.equals(username))
            if (!username.equals(request.getServiceTarget().getUser().getEmail()))
                new RuntimeException("No tiene permiso para ver este petición");

        return requestMapper.toRequestRes(request);
    }

    @Override
    public List<RequestRes> getRequestsMadeByUser(){
        String email = authenticationFacade.getAuthenticatedUserEmail();
        UserEntity user = this.userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Request> requests = this.requestRepository.findAllByUserOriginId(user.getId());

        return requests.stream()
                .map(requestMapper::toRequestRes)
                .collect(Collectors.toList());
    }

    @Override
    public List<RequestRes> getRequestsReceivedByUser(){
        String email = authenticationFacade.getAuthenticatedUserEmail();
        UserEntity user = this.userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Request> requests = this.requestRepository.findAllByServiceTargetUserId(user.getId());

        return requests.stream()
                .map(requestMapper::toRequestRes)
                .collect(Collectors.toList());
    }



}
