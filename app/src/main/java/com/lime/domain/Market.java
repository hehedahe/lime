package com.lime.domain;

public class Market {
  int itemId;
  int userId;
  int cityId;
  String itemName;
  int itemCost;
  String content;
  String rgtDate;
  String mdfyDate;
  String transState;
  int viewCount;
  String regionName;
  String cityName;
  // List<ContactTel> tels;

  @Override
  public String toString() {
    return "Market [itemId=" + itemId + ", userId=" + userId + ", cityId=" + cityId + ", itemName="
        + itemName + ", itemCost=" + itemCost + ", content=" + content + ", rgtDate=" + rgtDate
        + ", mdfyDate=" + mdfyDate + ", transState=" + transState + ", viewCount=" + viewCount
        + "]";
  }

  public int getItemId() {
    return itemId;
  }

  public void setItemId(int itemId) {
    this.itemId = itemId;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public int getCityId() {
    return cityId;
  }

  public void setCityId(int cityId) {
    this.cityId = cityId;
  }

  public String getItemName() {
    return itemName;
  }

  public void setItemName(String itemName) {
    this.itemName = itemName;
  }

  public int getItemCost() {
    return itemCost;
  }

  public void setItemCost(int itemCost) {
    this.itemCost = itemCost;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getRgtDate() {
    return rgtDate;
  }

  public void setRgtDate(String rgtDate) {
    this.rgtDate = rgtDate;
  }

  public String getMdfyDate() {
    return mdfyDate;
  }

  public void setMdfyDate(String mdfyDate) {
    this.mdfyDate = mdfyDate;
  }

  public String getTransState() {
    return transState;
  }

  public void setTransState(String transState) {
    this.transState = transState;
  }

  public int getViewCount() {
    return viewCount;
  }

  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }

  public String getRegionName() {
    return regionName;
  }

  public void setRegionName(String regionName) {
    this.regionName = regionName;
  }

  public String getCityName() {
    return cityName;
  }

  public void setCityName(String cityName) {
    this.cityName = cityName;
  }

}