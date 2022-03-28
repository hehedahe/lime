package com.lime.domain;

public class User {
  String no;
  String userId;
  String name;
  String email;
  String userType;
  String rgtDate;
  int sum;
  String gender;
  String bankName;
  String acntNo;
  String acntHolder;
  String blockDate;



  public String getNo() {
    return no;
  }

  public void setNo(String no) {
    this.no = no;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUserType() {
    return userType;
  }

  public void setUserType(String userType) {
    this.userType = userType;
  }

  public String getRgtDate() {
    return rgtDate;
  }

  public void setRgtDate(String rgtDate) {
    this.rgtDate = rgtDate;
  }

  public int getSum() {
    return sum;
  }

  public void setSum(int sum) {
    this.sum = sum;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public String getBankName() {
    return bankName;
  }

  public void setBankName(String bankName) {
    this.bankName = bankName;
  }

  public String getAcntNo() {
    return acntNo;
  }

  public void setAcntNo(String acntNo) {
    this.acntNo = acntNo;
  }

  public String getAcntHolder() {
    return acntHolder;
  }

  public void setAcntHolder(String acntHolder) {
    this.acntHolder = acntHolder;
  }

  public String getBlockDate() {
    return blockDate;
  }

  public void setBlockDate(String blockDate) {
    this.blockDate = blockDate;
  }

  @Override
  public String toString() {
    return "User [no=" + no + ", name=" + name + ", email=" + email + ", userType=" + userType
        + ", rgtDate=" + rgtDate + ", sum=" + sum + ", gender=" + gender + ", bankName=" + bankName
        + ", acntNo=" + acntNo + ", acntHolder=" + acntHolder + ", blockDate=" + blockDate + "]";
  }


}
