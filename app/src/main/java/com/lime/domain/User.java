package com.lime.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
  Integer lvId;
  Integer mannerScore;
  String region;
  String city;
  String club;
  String hand;
  String level;

  MatchRsv matchRsv;

  int sum;
  int num;//페이징처리(row_number index)
  int userCount;//총 회원수
}

