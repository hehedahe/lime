package com.lime.domain;

import java.util.Date;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Clazz {
  int clsId;
  int userId;
  int cityId;
  String title;
  String intro;
  String photo;
  int cost;
  String startDate;
  String endDate;
  int perWeek;
  String level;
  String tchrIntro;
  String dtlIntro;
  Date rgtDate;
  Date mdfyDate;
  int regionId;
  String regionName;
  String cityName;

  User writer;
}
