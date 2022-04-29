package com.lime.domain;

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


  // 회원가입시 사용하는 도메인 정보
  String unrgtDate;
  boolean unrgtYn;
  String userImg;
  int clubId;
  String brthDate;
  int socialId;
  boolean socialYn;
  int bankId;
  String accountNo;
  String accountHolder;
  String scope;
  int preferDays;
  int preferWeekend;
  int cityId;
  int regionId;
  String cityName;
  String regionName;
  int courtTypeId;
  String courtTypeName;
  String leftYn;

  // 여기까지
}

