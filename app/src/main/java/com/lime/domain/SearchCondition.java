package com.lime.domain;

public class SearchCondition {
  Integer region;
  String city;
  Integer level;
  Integer matchType;
  Integer courtType;

  public SearchCondition() {}

  public SearchCondition(Integer region, String city, Integer level, Integer matchType, Integer courtType) {
    this.region = region;
    this.city = city;
    this.level = level;
    this.matchType = matchType;
    this.courtType = courtType;
  }

  @Override
  public String toString() {
    return "SearchCondition [region=" + region + ", city=" + city + ", level=" + level
        + ", matchType=" + matchType + ", courtType=" + courtType + "]";
  }

  public Integer getRegion() {
    return region;
  }

  public void setRegion(Integer region) {
    this.region = region;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public Integer getLevel() {
    return level;
  }

  public void setLevel(Integer level) {
    this.level = level;
  }

  public Integer getMatchType() {
    return matchType;
  }

  public void setMatchType(Integer matchType) {
    this.matchType = matchType;
  }

  public Integer getCourtType() {
    return courtType;
  }

  public void setCourtType(Integer courtType) {
    this.courtType = courtType;
  }

}
