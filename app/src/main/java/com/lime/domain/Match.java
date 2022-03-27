package com.lime.domain;

import java.sql.Date;
import java.time.LocalTime;

public class Match {
  int no;
  int courtNo;
  int managerNo;
  int matchTypeNo;
  Date matchDate;
  LocalTime startTime;
  LocalTime endTime;
  int fee;
  String state;

  @Override
  public String toString() {
    return "Match [no=" + no + ", courtNo=" + courtNo + ", managerNo=" + managerNo
        + ", matchTypeNo=" + matchTypeNo + ", matchDate=" + matchDate + ", startTime=" + startTime
        + ", endTime=" + endTime + ", fee=" + fee + ", state=" + state + "]";
  }

  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getCourtNo() {
    return courtNo;
  }
  public void setCourtNo(int courtNo) {
    this.courtNo = courtNo;
  }
  public int getManagerNo() {
    return managerNo;
  }
  public void setManagerNo(int managerNo) {
    this.managerNo = managerNo;
  }
  public int getMatchTypeNo() {
    return matchTypeNo;
  }
  public void setMatchTypeNo(int matchTypeNo) {
    this.matchTypeNo = matchTypeNo;
  }
  public Date getMatchDate() {
    return matchDate;
  }
  public void setMatchDate(Date matchDate) {
    this.matchDate = matchDate;
  }
  public LocalTime getStartTime() {
    return startTime;
  }
  public void setStartTime(LocalTime startTime) {
    this.startTime = startTime;
  }
  public LocalTime getEndTime() {
    return endTime;
  }
  public void setEndTime(LocalTime endTime) {
    this.endTime = endTime;
  }
  public int getFee() {
    return fee;
  }
  public void setFee(int fee) {
    this.fee = fee;
  }
  public String getState() {
    return state;
  }
  public void setState(String state) {
    this.state = state;
  }
}
