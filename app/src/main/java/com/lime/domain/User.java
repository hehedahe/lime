package com.lime.domain;

import java.sql.Date;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class User {
  String no;
  String userId; // user_id
  String name; 
  String email;
  String userType;
  String rgtDate;
  int sum;
  String gender; //gender
  String bankName; // 은행명
  String acntNo; // 계좌번호
  String acntHolder; // 예금주명
  String blockDate; // 제재일
  
  
  String password;
  String phoneNo;
  boolean eventYn;
  Date brthDay;
  String UserImg;
  String UserType;

  
  int num;//페이징처리(row_number index)
  int userCount;//총 회원수
  
  int ttlCash; // 라임캐시 잔액
}

