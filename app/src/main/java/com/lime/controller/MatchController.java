package com.lime.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.service.MatchService;

@RestController
@RequestMapping("/match")
public class MatchController {

  private static final Logger log = LogManager.getLogger(MatchController.class);

  @Autowired
  MatchService matchService;

  @RequestMapping("/list")
  public Object list() {
    return matchService.list();
  }

}
