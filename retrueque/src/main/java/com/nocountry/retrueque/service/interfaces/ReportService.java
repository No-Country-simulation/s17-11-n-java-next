package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.dto.request.ReportReq;
import com.nocountry.retrueque.model.dto.response.ReportRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReportService {
  ReportRes create (ReportReq report);
  Page<ReportRes> getAll(Pageable page);
  ReportRes getById(long id);
  ReportRes updateById(ReportReq report, long id);
  String deleteById(long id);
}
