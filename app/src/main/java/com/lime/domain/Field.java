package com.lime.domain;

import lombok.Data;

@Data
public class Field {
  int fieldId;
  String name;
  String addr;
  boolean indYn;
  boolean parkingArea;
  float lat;
  float lng;
  String courtName;
  int courtId;
  int courtTypeId;
  float distance;
}
