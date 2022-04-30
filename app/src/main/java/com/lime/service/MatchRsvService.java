package com.lime.service;

import java.util.List;
import com.lime.domain.MatchRsv;

public interface MatchRsvService {

  //  int add(int limeId, MatchRsv matchRsv);

  List<MatchRsv> list();

  int getCount();

  int getCount(Integer matchId);

  MatchRsv get(int matchId, int userId);

  List<MatchRsv> get(int userId);

  MatchRsv getUsers(int matchId);

  MatchRsv getAverageLevel(Integer matchId);
}
