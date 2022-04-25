package com.lime.domain;

import java.sql.Date;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class User {
  int userId; // user_id
  String name; 
  String email;
  String password;
  String userType;
  String rgtDate;
  int ttlCash; // 라임캐시 잔액
  String gender; //gender
  String bankName; // 은행명
  String acntNo; // 계좌번호
  String acntHolder; // 예금주명
  String blockDate; // 제재일
  String phoneNo;
  boolean eventYn;
  String brthDay;
  String UserImg;
  String UserType;

  Integer mannerScore; // 매너점수
  String region;
  String city;
  String club;
  String hand;
  String level;

  int sum;
  int num;//페이징처리(row_number index)
  int userCount;//총 회원수
}

