package com.nocountry.retrueque.model.enums;

import lombok.Getter;

@Getter
public enum Day {
  MONDAY(1), TUESDAY(2), WEDNESDAY(3), THURSDAY(4), FRIDAY(5), SATURDAY(6), SUNDAY(7);
  private final int id;

  Day(int id) {
    this.id = id;
  }

  public static Day fromId(int id) {
    for (Day day : values()) {
      if (day.getId() == id) return day;
    }
    throw new IllegalArgumentException("id de dia invalido. id:" + id);
  }

  public static Day fromName(String name) {
    for (Day day : values()) {
      if (day.name().equals(name)) return day;
    }
    throw new IllegalArgumentException("nombre de dia invalido. nombre:" + name);
  }
}
