package com.lime.domain;

import java.util.Date;

public class User {
  int userId;
  String email;
  String name;
  String phone;
  Date retDate;
  Date unrgtDate;
  Boolean unrgtYn;
  String pwd;
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
  public String getPhone() {
    return phone;
  }
  public void setPhone(String phone) {
    this.phone = phone;
  }
  public Date getRetDate() {
    return retDate;
  }
  public void setRetDate(Date retDate) {
    this.retDate = retDate;
  }
  public Date getUnrgtDate() {
    return unrgtDate;
  }
  public void setUnrgtDate(Date unrgtDate) {
    this.unrgtDate = unrgtDate;
  }
  public Boolean getUnrgtYn() {
    return unrgtYn;
  }
  public void setUnrgtYn(Boolean unrgtYn) {
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
  @Override
  public String toString() {
    return "User [userId=" + userId + ", email=" + email + ", name=" + name + ", phone=" + phone
        + ", retDate=" + retDate + ", unrgtDate=" + unrgtDate + ", unrgtYn=" + unrgtYn + ", pwd="
        + pwd + ", userImg=" + userImg + ", userType=" + userType + "]";
  }
}
