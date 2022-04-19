package com.lime.controller;

import static com.lime.controller.ResultMap.FAIL;
import static com.lime.controller.ResultMap.SUCCESS;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.Match;
import com.lime.domain.SearchCondition;
import com.lime.service.MatchService;

@RestController
@RequestMapping("/match")
public class MatchController {

  private static final Logger log = LogManager.getLogger(MatchController.class);

  @Autowired
  MatchService matchService;

  @GetMapping("/list")
  public Object list(SearchCondition sc) {
    log.debug(sc);
    return matchService.getSearchSelectMatch(sc);
  }

  @GetMapping("/get")
  public Object get(int matchId) {
    Match match = matchService.get(matchId);
    if (match == null) {
      return new ResultMap().setStatus(FAIL).setData("해당 번호의 매치가 없습니다.");
    }
    return new ResultMap().setStatus(SUCCESS).setData(match);
  }

}
