package com.lime.domain;

import lombok.Data;

@Data
public class MatchRsv {
  int mtchId;
  int userId;
  int limeId;
  String state;
}
