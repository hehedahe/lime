package com.lime.domain;

public class Field {
  int no;
  int fieldId;
  String fName;
  String addr;
  String courtType;
  String courtCnt;
  String parkingAvt;
  String indYn;
  String lightYn;
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getFieldId() {
    return fieldId;
  }
  public void setFieldId(int fieldId) {
    this.fieldId = fieldId;
  }
  public String getfName() {
    return fName;
  }
  public void setfName(String fName) {
    this.fName = fName;
  }
  public String getAddr() {
    return addr;
  }
  public void setAddr(String addr) {
    this.addr = addr;
  }
  public String getCourtType() {
    return courtType;
  }
  public void setCourtType(String courtType) {
    this.courtType = courtType;
  }
  public String getCourtCnt() {
    return courtCnt;
  }
  public void setCourtCnt(String courtCnt) {
    this.courtCnt = courtCnt;
  }
  public String getParkingAvt() {
    return parkingAvt;
  }
  public void setParkingAvt(String parkingAvt) {
    this.parkingAvt = parkingAvt;
  }
  public String getIndYn() {
    return indYn;
  }
  public void setIndYn(String indYn) {
    this.indYn = indYn;
  }
  public String getLightYn() {
    return lightYn;
  }
  public void setLightYn(String lightYn) {
    this.lightYn = lightYn;
  }
  @Override
  public String toString() {
    return "Field [no=" + no + ", fieldId=" + fieldId + ", fName=" + fName + ", addr=" + addr
        + ", courtType=" + courtType + ", courtCnt=" + courtCnt + ", parkingAvt=" + parkingAvt
        + ", indYn=" + indYn + ", lightYn=" + lightYn + "]";
  }
  
  
  
}
