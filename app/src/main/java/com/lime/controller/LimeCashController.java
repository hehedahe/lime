package com.lime.controller;

import com.lime.domain.LimeCash;
import com.lime.service.LimeCashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.lime.controller.ResultMap.FAIL;
import static com.lime.controller.ResultMap.SUCCESS;

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
}
