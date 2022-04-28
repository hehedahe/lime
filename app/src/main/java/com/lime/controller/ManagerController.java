package com.lime.controller;

import com.lime.domain.MatchRsv;
import com.lime.service.MatchRsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import static com.lime.controller.ResultMap.SUCCESS;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    MatchRsvService mrService;

    @GetMapping("/getUsers")
    public Object getUsers(@RequestParam int matchId) {
        MatchRsv users = mrService.getUsers(matchId);
        return new ResultMap().setStatus(SUCCESS).setData(users);
    }

}
