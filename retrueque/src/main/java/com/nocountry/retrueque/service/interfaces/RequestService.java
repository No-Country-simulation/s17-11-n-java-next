package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.dto.request.RequestCommentReq;
import com.nocountry.retrueque.model.dto.request.RequestReq;
import com.nocountry.retrueque.model.dto.request.RequestUpdateReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.RequestCommentsRes;
import com.nocountry.retrueque.model.dto.response.RequestMesRes;
import com.nocountry.retrueque.model.dto.response.RequestRes;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface RequestService {
    RequestMesRes create(RequestReq requestReq);

    RequestMesRes update(Long id, RequestUpdateReq requestUpdateReq);

    RequestRes findById(Long id);

    List<RequestRes> getRequestsMadeByUser();

    List<RequestRes> getRequestsReceivedByUser();

    CustomPage<RequestCommentsRes> getReceivedCommentsByUserId(Long id, Pageable pageable);

    RequestCommentsRes getCommentById(Long id);

    RequestCommentsRes updateCommentById(Long id, RequestCommentReq request);
}
