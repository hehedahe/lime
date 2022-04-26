package com.lime.controller;

import static com.lime.controller.ResultMap.FAIL;
import static com.lime.controller.ResultMap.SUCCESS;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.LimeCash;
import com.lime.domain.User;
import com.lime.service.LimeCashService;

@RestController
@RequestMapping("/limecash")
public class LimeCashController {

  @Autowired
  LimeCashService lcService;

  @PostMapping("/charge")
  public Object charge(@RequestBody LimeCash limeCash) {
    Integer charge = lcService.addCash(limeCash);

    if (charge == 0) {
      return new ResultMap().setStatus(FAIL);
    } else {
      return new ResultMap().setStatus(SUCCESS);
    }
  }

  @GetMapping("/get")
  public Object get(HttpSession session) {
    User user = (User) session.getAttribute("loginUser");

    int userId = user.getUserId();

    List<LimeCash> lcList = lcService.findByUserId(userId);

    return new ResultMap().setStatus(SUCCESS).setData(lcList);
  }
}
