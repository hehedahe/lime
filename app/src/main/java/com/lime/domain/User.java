package com.lime.domain;

import java.sql.Date;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class User {
  int userId;
  String name; 
  String email;
  String password;
  String rgtDate;
  int ttlCash; // 라임캐시 잔액
  String gender;
  String bankName;
  String acntNo;
  String acntHolder;
  String blockDate;
  String phoneNo;
  boolean eventYn;
  String brthDay;
  String userImg;
  String userType;
  Integer mannerScore;
  String region;
  String city;
  String club;
  String hand;
  String level;

  int sum;
  int num;//페이징처리(row_number index)
  int userCount;//총 회원수
}

