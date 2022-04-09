package com.lime.service;

import java.util.List;
import com.lime.domain.Match;

public interface MatchService {

  List<Match> list();

  int getCount();

}
