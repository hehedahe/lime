package com.lime.domain;

import lombok.Data;

@Data
public class Market {
  int itemId;
  int userId;
  int cityId;
  String itemName;
  int itemCost;
  String content;
  String rgtDate;
  String mdfyDate;
  String transState;
  int viewCount;
  String regionName;
  String cityName;
  // List<ContactTel> tels;

}