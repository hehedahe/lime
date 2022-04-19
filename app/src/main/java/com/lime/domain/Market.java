package com.lime.domain;

import lombok.Data;

@Data
public class Market {
  int itemId;
  int userId;
  int cityId;
  int transRpyId;
  String itemName;
  int itemCost;
  String content;
  String rgtDate;
  String mdfyDate;
  String transState;
  int viewCount;
  String regionName;
  String cityName;
  String userName;
  int mannerScore;
  String lvName;
  String photo;
  // List<ContactTel> tels;
}
