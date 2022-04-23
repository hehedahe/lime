package com.lime.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Field {
  int fieldId;
  String name;
  String addr;
  String number;
  boolean indYn;
  boolean parkingArea;
  float lat;
  float lng;
  String fieldType;
  int courtId;
  String courtName;
  int courtTypeId;
  String cTypeName;
  float distance;
  int regionId;
  String regionName;
  int cityId;
  String cityName;
  int courtCnt;
  String lightYn;
  String parkingYn;
  String indYnName;
}
