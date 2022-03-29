package com.lime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.service.MatchService;

@RestController
public class MatchController {

  @Autowired
  MatchService matchService;

  @RequestMapping("/match/list")
  public Object list() {
    return matchService.list();
  }
}
