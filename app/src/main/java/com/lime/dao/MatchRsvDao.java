package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.lime.domain.MatchRsv;

@Mapper
public interface MatchRsvDao {

  int countAll();

  int countByMatchId(Integer matchId);

  List<MatchRsv> findAll();

  int insert(@Param("limeId") int limeId, @Param("matchRsv") MatchRsv matchRsv);

  MatchRsv findByMatchIdAndUserId(@Param("matchId") int matchId, @Param("userId") int userId);

  List<MatchRsv> findByUserId(int userId);

  MatchRsv findUsers(int matchId);
  
  //  int updateTeam(MatchRsv matchRsv);
  //  int updateScore(MatchRsv matchRsv);
  
  MatchRsv getAverageLevel(Integer matchId);


}
