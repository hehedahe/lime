package com.lime.domain;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LimeCash {
  int limeId;
  int userId;
  int amt;
  Date date;
  String merchantUid;
  String impUid;
  String typeUse;
  CourtRsv courtRsv;
  MatchRsv matchRsv;
  String myDate; // 정윤
  String used;
}
