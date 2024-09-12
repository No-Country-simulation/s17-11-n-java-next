package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.dto.request.RequestReq;
import com.nocountry.retrueque.model.dto.request.RequestUpdateReq;
import com.nocountry.retrueque.model.dto.response.RequestRes;

import java.util.List;

public interface RequestService {
    RequestRes create(RequestReq requestReq);
    RequestRes update(Long id, RequestUpdateReq requestUpdateReq);
    RequestRes findById(Long id);
    List<RequestRes> getRequestsMadeByUser();
    public List<RequestRes> getRequestsReceivedByUser();
}
