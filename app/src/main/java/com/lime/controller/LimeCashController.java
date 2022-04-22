package com.lime.controller;

import static com.lime.controller.ResultMap.SUCCESS;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.LimeCash;
import com.lime.service.LimeCashService;

@RestController
@RequestMapping("/book")
public class LimeCashController {

  private static final Logger log = LogManager.getLogger(LimeCashController.class);

  @Autowired
  LimeCashService lcService;

  @PostMapping("/court")
  public Object insert(@RequestBody LimeCash limeCash) {
    return new ResultMap().setStatus(SUCCESS).setData(lcService.add(limeCash));
  }

}
