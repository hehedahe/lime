package com.lime.controller;

import com.lime.domain.Evaluation;
import com.lime.domain.MatchRsv;
import com.lime.domain.User;
import com.lime.service.EvaluationService;
import com.lime.service.MatchRsvService;
import com.lime.service.RatingService;
import com.lime.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.lime.controller.ResultMap.FAIL;
import static com.lime.controller.ResultMap.SUCCESS;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    MatchRsvService mrService;

    @Autowired
    EvaluationService evService;

//    @Autowired
//    RatingService rtService;

    @Autowired
    UserService uService;

    @GetMapping("/getUsers")
    public Object getUsers(@RequestParam Integer matchId) {
        MatchRsv users = mrService.getUsers(matchId);
        return new ResultMap().setStatus(SUCCESS).setData(users);
    }

//    @PutMapping("/setTeam")
//    public Object setTeam(@RequestBody MatchRsv matchRsv) {
//        int setTeam = rtService.addTeamInfo(matchRsv);
//
//        if (setTeam != 1) {
//            return new ResultMap().setStatus(FAIL);
//        } else {
//            return new ResultMap().setStatus(SUCCESS).setData(setTeam);
//        }
//    }
//
//    @PutMapping("/updateScore")
//    public Object updateScore(@RequestBody MatchRsv matchRsv) {
//
//        System.out.println(matchRsv);
//        int updatedData = rtService.updateScore(matchRsv);
//
//        if (updatedData == 1) {
//            return new ResultMap().setStatus(SUCCESS).setData(updatedData);
//        } else {
//            return new ResultMap().setStatus(FAIL);
//        }
//    }

    @PutMapping("/update")
    public Object update(@RequestBody User user) {
        int count = uService.update(user);

        if (count == 1) {
            return new ResultMap().setStatus(SUCCESS);
        } else {
            return new ResultMap().setStatus(FAIL);
        }
    }

    @GetMapping("/findList")
    public List<Evaluation> findEvalList(@RequestParam Integer userId) {
        return evService.findList(userId);
    }

    @GetMapping("/findMtch")
    public Evaluation findMtch(@RequestParam Integer mtchId) {
        return evService.findMtch(mtchId);
    }
}


