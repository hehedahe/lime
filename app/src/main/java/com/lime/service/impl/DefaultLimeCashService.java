package com.lime.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lime.dao.CourtRsvDao;
import com.lime.dao.LimeCashDao;
import com.lime.domain.CourtRsv;
import com.lime.domain.LimeCash;
import com.lime.service.LimeCashService;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DefaultLimeCashService implements LimeCashService {

  @Autowired
  LimeCashDao lcDao;

  @Autowired
  CourtRsvDao crDao;

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
}
