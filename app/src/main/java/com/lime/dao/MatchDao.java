package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.Match;
import com.lime.domain.SearchCondition;

@Mapper
public interface MatchDao {

  int countAll();

  List<Match> findAll();

  Match findByNo(int matchId);

  List<Match> searchSelectMatch(SearchCondition sc);

}
