package com.lime.domain;

import java.sql.Date;

public class User {

  int no;
  String email;
  String name;
  String phone;
  Date rgtDate;
  Date unrgtDate;
  boolean unrgtYn;
  String password;
  String userImg;
  String userType;


  @Override
  public String toString() {
    return "User [no=" + no + ", email=" + email + ", name=" + name + ", phone=" + phone
        + ", rgtDate=" + rgtDate + ", unrgtDate=" + unrgtDate + ", unrgtYn=" + unrgtYn
        + ", password=" + password + ", userImg=" + userImg + ", userType=" + userType + "]";
  }

  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
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
  public String getPhone() {
    return phone;
  }
  public void setPhone(String phone) {
    this.phone = phone;
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
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
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
