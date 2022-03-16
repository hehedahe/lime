package com.lime.domain;

import java.sql.Date;

public class User{
  int no;
  String email;
  String name;
  String phoneNo;
  Date rgtDate;
  Date unrgtDate;
  boolean unrgtYn;
  String pwd;
  String userImg;
  String userType;

  @Override
  public String toString() {
    return "User [userId=" + no + ", email=" + email + ", name=" + name + ", phoneNo=" + phoneNo
        + ", rgtDate=" + rgtDate + ", unrgtDate=" + unrgtDate + ", unrgtYn=" + unrgtYn + ", pwd="
        + pwd + ", userImg=" + userImg + ", userType=" + userType + "]";
  }

  public int getUserId() {
    return no;
  }

  public void setUserId(int userId) {
    this.no = userId;
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

  public String getPhoneNo() {
    return phoneNo;
  }

  public void setPhoneNo(String phoneNo) {
    this.phoneNo = phoneNo;
  }

  public Date getRgtDate() {
    return rgtDate;
  }

  public void setRgtDate(Date rgtDate) {
    this.rgtDate = rgtDate;
  }

  public Date getUnrgtDate() {
    return unrgtDate;
  }

  public void setUnrgtDate(Date unrgtDate) {
    this.unrgtDate = unrgtDate;
  }

  public boolean isUnrgtYn() {
    return unrgtYn;
  }

  public void setUnrgtYn(boolean unrgtYn) {
    this.unrgtYn = unrgtYn;
  }

  public String getPwd() {
    return pwd;
  }

  public void setPwd(String pwd) {
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

}
