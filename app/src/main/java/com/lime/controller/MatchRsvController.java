package com.lime.controller;

import static com.lime.controller.ResultMap.FAIL;
import static com.lime.controller.ResultMap.SUCCESS;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.LimeCash;
import com.lime.domain.MatchRsv;
import com.lime.domain.User;
import com.lime.service.LimeCashService;
import com.lime.service.ManageService;
import com.lime.service.MatchRsvService;

@RestController
@RequestMapping("/rsv/match")
public class MatchRsvController {

  private static final Logger log = LogManager.getLogger(MatchRsvController.class);

  @Autowired
  MatchRsvService matchRsvService;

  @Autowired
  LimeCashService limeCashService;

  @Autowired
  ManageService manageService;

  @GetMapping("/list")
  public Object list() {
    return matchRsvService.list();
  }

  @GetMapping("/count")
  public Object get(int matchId) {
    int reserved = matchRsvService.getCount(matchId);
    //    if (match == null) {
    //      return new ResultMap().setStatus(FAIL).setData("해당 번호의 매치가 없습니다.");
    //    }
    return new ResultMap().setStatus(SUCCESS).setData(reserved);
  }

  @GetMapping("/balance")
  public Object getBalance(HttpSession session) {
    User user = (User) session.getAttribute("loginUser");

    if (user != null) {
      int userId = user.getUserId();
      User userInfo = manageService.userGet(userId);
      return new ResultMap().setStatus(SUCCESS).setData(userInfo);
    }
    return new ResultMap().setStatus(FAIL).setData("로그인하지 않았습니다.");
  }

  @GetMapping("/check-reserved")
  public Object get(HttpSession session, int matchId) {
    User user = (User) session.getAttribute("loginUser");

    int userId = user.getUserId();

    MatchRsv match = matchRsvService.get(matchId, userId);

    if (match != null) {
      return new ResultMap().setStatus(SUCCESS).setData(match);      
    }
    return new ResultMap().setStatus(FAIL).setData("예약한 적 없습니다.");
  }

  @GetMapping("/avg-level")
  public Object compare(int matchId) {
    MatchRsv match = matchRsvService.getAverageLevel(matchId);

    if (match != null) {
      return new ResultMap().setStatus(SUCCESS).setData(match);
    }
    return new ResultMap().setStatus(FAIL).setData("매치 인원이 부족하거나 경기 시작 30분 전이 아닙니다.");
  }

  @GetMapping("/get")
  public Object get(HttpSession session) {
    User user = (User) session.getAttribute("loginUser");

    int userId = user.getUserId();

    List<MatchRsv> matchList = matchRsvService.get(userId);

    return new ResultMap().setStatus(SUCCESS).setData(matchList);
  }

  @RequestMapping("/add")
  public Object checkout(LimeCash limeCash, MatchRsv matchRsv, HttpSession session) {
    // 요청 파라미터 분석 및 가공
    User user = (User) session.getAttribute("loginUser");
    limeCash.setUserId(user.getUserId());

    log.debug("limeCash = " + limeCash);

    matchRsv.setUserId(user.getUserId());
    matchRsv.setLimeId(limeCash.getLimeId());

    log.debug("matchRsv = " + matchRsv);

    limeCash.setMatchRsv(matchRsv);

    log.debug("limeCash = " + limeCash);

    limeCashService.checkout(limeCash);

    return new ResultMap().setStatus(SUCCESS);
  }
}
