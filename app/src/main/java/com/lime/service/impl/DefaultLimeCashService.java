package com.lime.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lime.dao.CourtRsvDao;
import com.lime.dao.LimeCashDao;
import com.lime.dao.MatchRsvDao;
import com.lime.dao.UserDao;
import com.lime.domain.CourtRsv;
import com.lime.domain.LimeCash;
import com.lime.service.LimeCashService;

@Service
public class DefaultLimeCashService implements LimeCashService {

  @Autowired
  LimeCashDao lcDao;

  @Autowired
  CourtRsvDao crDao;

  @Autowired
  MatchRsvDao matchRsvDao;

  @Autowired
  UserDao mbDao;

  @Override
  @Transactional
  public int addCourtRsv(LimeCash limeCash) {
    Integer lcRes = lcDao.insertUse(limeCash);

    if(lcRes == 0){
      return 0;
    }

    //System.out.println(limeCash.getCourtRsv());
    CourtRsv cr = CourtRsv.builder()
        .limeId(limeCash.getLimeId())
        .fieldId(limeCash.getCourtRsv().getFieldId())
        .courtId(limeCash.getCourtRsv().getCourtId())
        .dateTime(limeCash.getCourtRsv().getDateTime())
        .build();
    //    System.out.println(cr);

    crDao.insert(cr);
    return 1;
  }

  @Override
  @Transactional
  public int checkout(LimeCash limeCash) {
    System.out.println(limeCash);
    lcDao.checkout(limeCash);
    matchRsvDao.insert(limeCash.getLimeId(), limeCash.getMatchRsv());

    return 1;
  }


  @Override
  public int findCash(int userId) {
    return lcDao.findCash(userId);
  }

  @Override
  public int addCash(LimeCash limeCash) {
    Integer chargeCash = lcDao.insertCash(limeCash);

    if (chargeCash == 0) {
      return 0;
    } else {
      return 1;
    }
  }

  @Override
  public List<LimeCash> findByUserId(int userId) {
    return lcDao.findByUserId(userId);
  }
}
