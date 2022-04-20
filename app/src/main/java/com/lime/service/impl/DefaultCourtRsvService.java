package com.lime.service.impl;

import com.lime.dao.CourtRsvDao;
import com.lime.domain.CourtRsv;
import com.lime.service.CourtRsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DefaultCourtRsvService implements CourtRsvService {

    @Autowired
    CourtRsvDao crDao;

    @Override
    public List<CourtRsv> findByDate(String date) {
        List<CourtRsv> res = crDao.findByDate(date);
        System.out.println("res:::::::::" + res);
        return res;
    }
}
