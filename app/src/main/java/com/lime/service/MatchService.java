package com.lime.service;

import java.util.List;
import com.lime.domain.Match;
import com.lime.domain.SearchCondition;

public interface MatchService {

  List<Match> list();

  int getCount();

  Match get(int matchId);

  List<Match> getSearchSelectMatch(SearchCondition sc);

}
