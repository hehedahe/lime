package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.Match;

@Mapper
public interface MatchDao {

  int countAll();

  List<Match> findAll();

  List<Match> findBy();

}
