package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.lime.domain.MatchRsv;

@Mapper
public interface MatchRsvDao {

  int countAll();

  List<MatchRsv> findAll();

  int insert(MatchRsv matchRsv);

  MatchRsv findByMatchIdAndUserId(@Param("matchId") int matchId, @Param("userId") int userId);

}