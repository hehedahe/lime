package com.lime.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lime.dao.CourtRsvDao;
import com.lime.dao.LimeCashDao;
import com.lime.dao.MatchRsvDao;
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

  @Override
  @Transactional
  public int add(LimeCash limeCash) {
    Integer lcRes = lcDao.insert(limeCash);
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
    System.out.println(cr);
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
}
