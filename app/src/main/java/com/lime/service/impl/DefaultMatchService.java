package com.lime.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lime.dao.MatchDao;
import com.lime.domain.Match;
import com.lime.service.MatchService;

@Service
public class DefaultMatchService implements MatchService {

  @Autowired
  MatchDao matchDao;

  @Override
  public List<Match> list() {
    return matchDao.findAll();
  }

  @Override
  public int getCount() {
    return matchDao.countAll();
  }
}
