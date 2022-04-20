package com.lime.domain;

import lombok.Data;

@Data
public class MatchRsv {
  int matchId;
  int userId;
  int limeId;
  String state;
  Match match;
}
