package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.PermissionDeniedException;
import com.nocountry.retrueque.exception.RequestNotFoundException;
import com.nocountry.retrueque.exception.ServicesNotFoundException;
import com.nocountry.retrueque.model.dto.request.RequestCommentReq;
import com.nocountry.retrueque.model.dto.request.RequestReq;
import com.nocountry.retrueque.model.dto.request.RequestUpdateReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.RequestCommentsRes;
import com.nocountry.retrueque.model.dto.response.RequestMesRes;
import com.nocountry.retrueque.model.dto.response.RequestRes;
import com.nocountry.retrueque.model.entity.Request;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.mapper.RequestMapper;
import com.nocountry.retrueque.repository.RequestRepository;
import com.nocountry.retrueque.repository.ServiceRepository;
import com.nocountry.retrueque.service.interfaces.AuthService;
import com.nocountry.retrueque.service.interfaces.EmailService;
import com.nocountry.retrueque.service.interfaces.RequestService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RequestServiceImp implements RequestService {

    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;
    private final ServiceRepository serviceRepository;
    private final EmailService emailService;
    private final AuthService authService;

    @Transactional
    @Override
    //Se debería validar que si se tiene una petición sin aceptar o cancelar de un servicio
    //no puedas mandar otra para evitar spam o incluso bloquear un usuario para otro
    public RequestMesRes create(RequestReq requestReq) {
        UserEntity user = this.authService.getAuthUser();

        Services service = this.serviceRepository.findById(requestReq.serviceId())
                .orElseThrow(() -> new ServicesNotFoundException(requestReq.serviceId()));

        if(service.getUser().getEmail().equals(user.getEmail()))
            throw new PermissionDeniedException("No tienes permitido crear una petición para tu propio servicio");

        Request request = this.requestMapper.toEntity(requestReq);
        request.setUserOrigin(user);
        request.setServiceTarget(service);

        Request saveRequest = this.requestRepository.save(request);

        Map<String, Object> templateModel = new HashMap<>();
        templateModel.put("name", service.getUser().getName()+" "+service.getUser().getLast_name());
        templateModel.put("requesterName", user.getName()+" "+user.getLast_name());
        //debería mostrar el detalle request, pero aún no existe el link, también ponerlo en una variable de entorno
        templateModel.put("requestUrl","https://s17-11-n-java-next-urev.onrender.com/dashboard/perfil");

        emailService.sendEmail(service.getUser().getEmail(), "¡Has recibido una nueva solicitud de servicio!",templateModel,"request-service");

        return new RequestMesRes(saveRequest.getId(),"Request created");
    }

    @Transactional
    @Override
    public RequestMesRes update(Long id, RequestUpdateReq requestUptdateReq) {
        Request request = this.requestRepository.findById(id).
                orElseThrow(()-> new RequestNotFoundException("Peticion con ID " + id + " no encontrada."));

        String email = this.authService.getAuthUser().getEmail();
        String a = request.getServiceTarget().getUser().getEmail();
        if (!email.equals(request.getServiceTarget().getUser().getEmail())) {
            throw new PermissionDeniedException("No tienes permitido aaceptar o cancelar esta solicitud");
        }

        request.setIsConfirm(requestUptdateReq.isConfirmed());
        Request requestSaved = requestRepository.save(request);

        Map<String, Object> templateModel = new HashMap<>();
        templateModel.put("name", requestSaved.getUserOrigin().getName()+" "+requestSaved.getUserOrigin().getLast_name());
        templateModel.put("providerName", requestSaved.getServiceTarget().getUser().getName()+" "+requestSaved.getServiceTarget().getUser().getLast_name());
        templateModel.put("requestUrl","https://s17-11-n-java-next-urev.onrender.com/dashboard/perfil");


        if(requestUptdateReq.isConfirmed()) {
            emailService.sendEmail(requestSaved.getUserOrigin().getEmail(),
                    "¡Buena Noticia! Tu Solicitud de Servicio ha Sido Aprobada",
                    templateModel, "request-confirmed");
        }
        else {
            templateModel.put("servicesUrl","https://s17-11-n-java-next-urev.onrender.com");
            emailService.sendEmail(requestSaved.getUserOrigin().getEmail(),
                    "Actualización sobre Tu Solicitud de Servicio",
                    templateModel,"request-rejected");
        }

        String message = requestSaved.getIsConfirm()?"Reques was confirmate":"Reques was rejected";

        return new RequestMesRes(requestSaved.getId(),message);
    }


    @Override
    public RequestRes findById(Long id) {
        Request request = requestRepository.findById(id).orElseThrow();

        String emailProvedor = request.getUserOrigin().getEmail();
        String emailAutenticado = this.authService.getAuthUser().getEmail();

        if (!emailAutenticado.equals(emailProvedor)) {
            if (!emailAutenticado.equals(request.getServiceTarget().getUser().getEmail())) {
                throw new PermissionDeniedException("No tienes permiso para ver este petición");
            }
        }
        return requestMapper.toRequestRes(request);
    }

    @Override
    public List<RequestRes> getRequestsMadeByUser(){
        UserEntity user = this.authService.getAuthUser();
        List<Request> requests = this.requestRepository.findAllByUserOriginId(user.getId());
        return requests.stream()
                .map(requestMapper::toRequestRes)
                .collect(Collectors.toList());
    }

    @Override
    public List<RequestRes> getRequestsReceivedByUser(){
        UserEntity user = this.authService.getAuthUser();
        List<Request> requests = this.requestRepository.findAllByServiceTargetUserId(user.getId());
        return requests.stream()
                .map(requestMapper::toRequestRes)
                .collect(Collectors.toList());
    }

    @Override
    public CustomPage<RequestCommentsRes> getReceivedCommentsByUserId(Long userId, Pageable pageable) {
        Page<RequestCommentsRes> page = requestRepository.findCommentsByUserId(userId, pageable);
        return requestMapper.toCustomPage(page);
    }

    @Override
    public RequestCommentsRes getCommentById(Long requestId) {
        Request request = this.requestRepository.findById(requestId)
                .orElseThrow(()-> new RequestNotFoundException("El id "+requestId+" no ha sido encontrado"));
        return this.requestMapper.toRequestCommentsRes(request);
    }

    @Override
    public RequestCommentsRes updateCommentById(Long id, RequestCommentReq requestComment) {
        Request request = this.requestRepository.findById(id)
                .orElseThrow(()-> new RequestNotFoundException("El id "+id+" no ha sido encontrado"));

        UserEntity user = this.authService.getAuthUser();

        if(!user.getEmail().equals(request.getUserOrigin().getEmail()) || !Boolean.TRUE.equals(request.getIsConfirm()))
            throw new PermissionDeniedException("No tiene permiso de añadir un comentario a esta petición");

        request.setReview(requestComment.review());
        request.setRating(requestComment.rating());
        Request saveRequest = requestRepository.save(request);

        return this.requestMapper.toRequestCommentsRes(saveRequest);
    }
}
