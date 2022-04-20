package com.lime.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
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

  ///중고물품게시판 
  String name; //판매자

  UserLogin writer;

  // List<ContactTel> tels;
}
