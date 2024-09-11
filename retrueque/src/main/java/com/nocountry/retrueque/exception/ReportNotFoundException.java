package com.nocountry.retrueque.exception;

import jakarta.persistence.EntityNotFoundException;

public class ReportNotFoundException extends EntityNotFoundException {
  public ReportNotFoundException(Long id) {
    super("Report not found, id:"+id);
  }
}
