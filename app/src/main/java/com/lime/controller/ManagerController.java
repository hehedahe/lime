package com.lime.controller;

import com.lime.domain.MatchRsv;
import com.lime.service.MatchRsvService;
import com.lime.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import static com.lime.controller.ResultMap.FAIL;
import static com.lime.controller.ResultMap.SUCCESS;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    MatchRsvService mrService;

    @Autowired
    RatingService rtService;

    @GetMapping("/getUsers")
    public Object getUsers(@RequestParam Integer matchId) {
        MatchRsv users = mrService.getUsers(matchId);
        return new ResultMap().setStatus(SUCCESS).setData(users);
    }

    @PutMapping("/setTeam")
    public Object setTeam(@RequestBody MatchRsv matchRsv) {
        int setTeam = rtService.addTeamInfo(matchRsv);

        if (setTeam != 1) {
            return new ResultMap().setStatus(FAIL);
        } else {
            return new ResultMap().setStatus(SUCCESS).setData(setTeam);
        }
    }

}
