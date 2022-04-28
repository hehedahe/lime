package com.lime.service;

import java.util.List;
import com.lime.domain.MatchRsv;
import com.lime.domain.User;

public interface MatchRsvService {

  //  int add(int limeId, MatchRsv matchRsv);

  List<MatchRsv> list();

  int getCount();

  MatchRsv get(int matchId, int userId);

  List<MatchRsv> get(int userId);

  MatchRsv getUsers(int matchId);
}
