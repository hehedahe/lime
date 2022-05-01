package com.lime.service.impl;

import com.lime.dao.MatchRsvDao;
import com.lime.domain.MatchRsv;
import com.lime.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DefaultRatingService implements RatingService {

    @Autowired
    MatchRsvDao mrDao;

    @Override
    public int addTeamInfo(MatchRsv matchRsv) {
        return mrDao.updateTeam(matchRsv);
    }
}
