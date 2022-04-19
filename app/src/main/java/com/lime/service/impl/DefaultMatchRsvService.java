package com.lime.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lime.dao.MatchRsvDao;
import com.lime.domain.MatchRsv;
import com.lime.service.MatchRsvService;

@Service
public class DefaultMatchRsvService implements MatchRsvService {

  @Autowired
  MatchRsvDao matchRsvDao;

  @Override
  public List<MatchRsv> list() {
    return matchRsvDao.findAll();
  }

  @Override
  public int getCount() {
    return matchRsvDao.countAll();
  }

  @Override
  public MatchRsv get(int matchId, int userId) {
    return matchRsvDao.findByMatchIdAndUserId(matchId, userId);
  }

  @Override
  public int add(MatchRsv matchRsv) {
    return matchRsvDao.insert(matchRsv);
  }

}
