package com.lime.domain;

import java.util.Date;

public class User {
  int userId;
  String email;
  String name;
  int phoneNo;
  Date rgt_date;
  Date unreg_data;
  int unreg_yn;
  int pwd;
  String userImg;
  String userType;

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getPhoneNo() {
    return phoneNo;
  }

  public void setPhoneNo(int phoneNo) {
    this.phoneNo = phoneNo;
  }

  public Date getRgt_date() {
    return rgt_date;
  }

  public void setRgt_date(Date rgt_date) {
    this.rgt_date = rgt_date;
  }

  public Date getUnreg_data() {
    return unreg_data;
  }

  public void setUnreg_data(Date unreg_data) {
    this.unreg_data = unreg_data;
  }

  public int getUnreg_yn() {
    return unreg_yn;
  }

  public void setUnreg_yn(int unreg_yn) {
    this.unreg_yn = unreg_yn;
  }

  public int getPwd() {
    return pwd;
  }

  public void setPwd(int pwd) {
    this.pwd = pwd;
  }

  public String getUserImg() {
    return userImg;
  }

  public void setUserImg(String userImg) {
    this.userImg = userImg;
  }

  public String getUserType() {
    return userType;
  }

  public void setUserType(String userType) {
    this.userType = userType;
  }

  @Override
  public String toString() {
    return "User [userId=" + userId + ", email=" + email + ", name=" + name + ", phoneNo=" + phoneNo
        + ", rgt_date=" + rgt_date + ", unreg_data=" + unreg_data + ", unreg_yn=" + unreg_yn
        + ", pwd=" + pwd + ", userImg=" + userImg + ", userType=" + userType + "]";
  }



}
