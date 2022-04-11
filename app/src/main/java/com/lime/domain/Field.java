package com.lime.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Field {
  int fieldId;
  String name;
  String addr;
  boolean indYn;
  boolean parkingArea;
  float lat;
  float lng;
  String fieldType;
  String courtName;
  int courtId;
  int courtTypeId;
  float distance;
  String cTypeName;
  int regionId;
  int cityId;
  String cityName;
}
