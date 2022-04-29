package com.lime.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserSignUp {
  int userId;
  String email;
  String name;
  String phoneNo;
  String rgtDate;
  String unrgtDate;
  boolean unrgtYn;
  String password;
  String userImg;
  String userType;
  //로그인에서 안받는 정보
  int clubId;
  String gender;
  String brthDate;
  int socialId;
  boolean socialYn;
  int bankId;
  String bankName;
  String accountNo;
  String accountHolder;
  boolean eventYn;
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
}
