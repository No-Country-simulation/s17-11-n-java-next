package com.nocountry.retrueque.model.enums;

import lombok.Getter;

@Getter
public enum ReportStatus {
  PENDING(1), ACCEPTED(2), REJECTED(3);

  private final int id;
  ReportStatus(int id) {
    this.id = id;
  }

  public static ReportStatus fromId(int id) {
    for (ReportStatus status : values()) {
      if (status.getId() == id) return status;
    }
    throw new IllegalArgumentException("id de reporte invalido. id:" + id);
  }

  public static ReportStatus fromName(String name) {
    for (ReportStatus status : values()) {
      if (status.name().equals(name)) return status;
    }
    throw new IllegalArgumentException("nombre de reporte invalido. nombre:" + name);
  }
}
