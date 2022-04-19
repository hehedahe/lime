package com.lime.domain;

import java.sql.Date;
import java.time.LocalTime;
import lombok.Data;

@Data
public class Match {
  int matchId;
  int courtNo;
  int managerNo;
  int matchTypeNo;
  int levelNo;
  Date matchDate;
  LocalTime startTime;
  LocalTime endTime;
  int fee;
  String state;
  String numOfPeople;
  Court court;
  String managerName;
}
