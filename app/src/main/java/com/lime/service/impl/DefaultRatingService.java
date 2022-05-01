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

//    @Override
//    public int addTeamInfo(MatchRsv matchRsv) {
//        return mrDao.updateTeam(matchRsv);
//    }

//    @Override
//    public int updateScore(MatchRsv matchRsv) {
//        int count = mrDao.updateScore(matchRsv);
////        MatchRsv updatedData;
//        if (count == 1) {
////            updatedData = MatchRsv.builder()
////                    .matchId(matchRsv.getMatchId()).userId(matchRsv.getUserId())
////                    .ratingList(matchRsv.getRatingList()).ratingScore(matchRsv.getRatingScore())
////                    .normalPoint(matchRsv.getNormalPoint())
////                    .matchPoint(matchRsv.getMatchPoint())
////                    .build();
//
//            return 1;
//        } else {
//            return 0;
//        }
//
//    }
}
