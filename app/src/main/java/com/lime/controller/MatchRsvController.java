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
import com.lime.domain.Member;
import com.lime.domain.SearchCondition;
import com.lime.domain.UserLogin;
import com.lime.service.LimeCashService;
import com.lime.service.MatchRsvService;

@RestController
@RequestMapping("/rsv/match")
public class MatchRsvController {

  private static final Logger log = LogManager.getLogger(MatchRsvController.class);

  @Autowired
  MatchRsvService matchRsvService;

  @Autowired
  LimeCashService limeCashService;

  @GetMapping("/list")
  public Object list() {
    return matchRsvService.list();
  }

  //  @GetMapping("/get")
  //  public Object get(int matchId, int userId) {
  //    MatchRsv match = matchRsvService.get(matchId, userId);
  //    if (match == null) {
  //      return new ResultMap().setStatus(FAIL).setData("해당 번호의 예약 내역이 없습니다.");
  //    }
  //    return new ResultMap().setStatus(SUCCESS).setData(match);
  //  }

  @GetMapping("/get")
  public Object get(HttpSession session) {
    Member user = (Member) session.getAttribute("loginUser");

    int userId = user.getNo();

    List<MatchRsv> matchList = matchRsvService.get(userId);
    if (matchList == null) {
      return new ResultMap().setStatus(FAIL).setData("해당 유저의 예약 내역이 없습니다.");
    }
    return new ResultMap().setStatus(SUCCESS).setData(matchList);
  }

  @GetMapping("/logincheck")
  public Object getOrderPage(SearchCondition sc, HttpSession session) {
    UserLogin user = (UserLogin) session.getAttribute("loginUser");
    //    log.info(Integer.parseInt(user.getUserId()));
    if (user == null) {
      return new ResultMap().setStatus(FAIL).setData("로그인 하지 않았습니다.");
    } else {
      return new ResultMap().setStatus(SUCCESS);
    }
  }

  @RequestMapping("/add")
  public Object checkout(LimeCash limeCash, MatchRsv matchRsv, HttpSession session) {

    // 요청 파라미터 분석 및 가공

    Member user = (Member) session.getAttribute("loginUser");
    limeCash.setUserId(user.getNo());

    log.debug("limeCash = " + limeCash);

    matchRsv.setUserId(user.getNo());
    matchRsv.setLimeId(limeCash.getLimeId());

    log.debug("matchRsv = " + matchRsv);

    limeCash.setMatchRsv(matchRsv);

    log.debug("limeCash = " + limeCash);

    limeCashService.checkout(limeCash);

    return new ResultMap().setStatus(SUCCESS);
  }
}
