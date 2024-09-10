package com.nocountry.retrueque.model.enums;

import lombok.Getter;

@Getter
public enum ShiftTime {
  DAY(1), AFTERNOON(2), NIGHT(3);

  private final int id;

  ShiftTime(int id) {
    this.id = id;
  }

  public static ShiftTime fromId(int id){
    for(ShiftTime shift : values()){
      if(shift.getId() == id) return shift;
    }
    throw new IllegalArgumentException("id de turno inválido. id:" + id);
  }
}
