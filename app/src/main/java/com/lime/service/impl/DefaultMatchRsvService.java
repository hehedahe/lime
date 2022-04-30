package com.lime.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lime.dao.LimeCashDao;
import com.lime.dao.MatchRsvDao;
import com.lime.domain.MatchRsv;
import com.lime.service.MatchRsvService;

@Service
public class DefaultMatchRsvService implements MatchRsvService {

  @Autowired
  MatchRsvDao matchRsvDao;

  @Autowired
  LimeCashDao limeCashDao;

  @Override
  public List<MatchRsv> list() {
    return matchRsvDao.findAll();
  }

  @Override
  public int getCount() {
    return matchRsvDao.countAll();
  }

  @Override
  public int getCount(Integer matchId) {
    return matchRsvDao.countByMatchId(matchId);
  }

  @Override
  public MatchRsv get(int matchId, int userId) {
    return matchRsvDao.findByMatchIdAndUserId(matchId, userId);
  }

  @Override
  public List<MatchRsv> get(int userId) {
    return matchRsvDao.findByUserId(userId);
  }

  @Override
  public MatchRsv getUsers(int matchId) {
    return matchRsvDao.findUsers(matchId);
  }

  @Override
  public MatchRsv getAverageLevel(Integer matchId) {
    return matchRsvDao.getAverageLevel(matchId);
  }

  //  @Override
  //  public int add(int limeId, MatchRsv matchRsv) {
  //    matchRsvDao.insert(limeId, matchRsv);
  //    return 1;
  //  }
}
