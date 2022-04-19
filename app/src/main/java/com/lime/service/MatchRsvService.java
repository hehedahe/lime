package com.lime.service;

import java.util.List;
import com.lime.domain.MatchRsv;

public interface MatchRsvService {

  int add(MatchRsv matchRsv);

  List<MatchRsv> list();

  int getCount();

  MatchRsv get(int matchId, int userId);

}
