package com.lime.controller;

import static com.lime.controller.ResultMap.SUCCESS;
import javax.servlet.http.HttpSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.LimeCash;
import com.lime.domain.MatchRsv;
import com.lime.domain.UserLogin;
import com.lime.service.LimeCashService;

@RestController
@RequestMapping("/rsv")
public class LimeCashController {

  private static final Logger log = LogManager.getLogger(LimeCashController.class);

  @Autowired
  LimeCashService lcService;

  @PostMapping("/court")
  public Object insert(@RequestBody LimeCash limeCash) {
    return new ResultMap().setStatus(SUCCESS).setData(lcService.add(limeCash));
  }

  @RequestMapping("/match")
  public Object checkout(LimeCash limeCash, MatchRsv matchRsv, HttpSession session) {

    // 요청 파라미터 분석 및 가공

    UserLogin user = (UserLogin) session.getAttribute("loginUser");
    limeCash.setUserId(Integer.parseInt(user.getUserId()));

    log.debug("limeCash = " + limeCash);

    matchRsv.setUserId(Integer.parseInt(user.getUserId()));
    matchRsv.setLimeId(limeCash.getLimeId());

    log.debug("matchRsv = " + matchRsv);

    limeCash.setMatchRsv(matchRsv);

    log.debug("limeCash = " + limeCash);

    lcService.checkout(limeCash);

    return new ResultMap().setStatus(SUCCESS);
  }


}
