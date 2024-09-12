package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.ReportNotFoundException;
import com.nocountry.retrueque.exception.ShiftNotFoundException;
import com.nocountry.retrueque.model.dto.request.ReportReq;
import com.nocountry.retrueque.model.dto.response.ReportRes;
import com.nocountry.retrueque.model.mapper.ReportMapper;
import com.nocountry.retrueque.repository.ReportRepository;
import com.nocountry.retrueque.repository.ServiceRepository;
import com.nocountry.retrueque.service.interfaces.AuthService;
import com.nocountry.retrueque.service.interfaces.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Set;
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
  private final ReportRepository reportRepository;
  private final ReportMapper reportMapper;
  private final AuthService authService;
  private final ServiceRepository serviceRepository;

  @Override
  public ReportRes create(ReportReq report) {
    var currentUser = this.authService.getAuthUser();
    var newReport = this.reportMapper.reqToEntity(report, serviceRepository);
    newReport.setUser(currentUser);
    var reportSaved = this.reportRepository.save(newReport);
    return this.reportMapper.entityToRes(reportSaved);
  }

  @Override
  public Page<ReportRes> getAll(Pageable page) {
    return this.reportRepository.findAll(page)
            .map(this.reportMapper::entityToRes);
  }

  @Override
  public ReportRes getById(long id) {
    return this.reportRepository.findById(id)
            .map(this.reportMapper::entityToRes)
            .orElseThrow(()->new ReportNotFoundException(id));
  }

  @Override
  public ReportRes updateById(ReportReq report, long id) {
    this.verifyIsExist(id);
    var currentUser = this.authService.getAuthUser();
    var newReport = this.reportMapper.reqToEntity(report, serviceRepository);
    newReport.setUser(currentUser);
    newReport.setId(id);
    var reportSaved = this.reportRepository.save(newReport);
    return this.reportMapper.entityToRes(reportSaved);
  }

  @Override
  public String deleteById(long id) {
    this.verifyIsExist(id);
    this.reportRepository.deleteById(id);
    return "report deleted successfully, id"+id;
  }

  private void verifyIsExist(long id){
    boolean isExist = this.reportRepository.existsById(id);
    if(!isExist) throw new ReportNotFoundException(id);
  }
}
