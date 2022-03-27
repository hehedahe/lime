package com.lime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.dao.MatchDao;

@RestController
public class MatchController {

  @Autowired
  MatchDao matchDao;

  @RequestMapping("/match/list")
  public Object list() {
    return matchDao.findAll();
  }
}
