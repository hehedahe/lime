package com.lime.controller;

import com.lime.domain.CourtRsv;
import com.lime.domain.LimeCash;
import com.lime.domain.Member;
import com.lime.service.CourtRsvService;
import com.lime.service.LimeCashService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import java.util.List;
import static com.lime.controller.ResultMap.FAIL;
import static com.lime.controller.ResultMap.SUCCESS;

@RestController
@RequestMapping("/court-rsv")
public class CourtRsvController {

    private static final Logger log = LogManager.getLogger(MatchRsvController.class);

    @Autowired
    CourtRsvService crService;

    @Autowired
    LimeCashService lcService;

    @GetMapping("/get")
    public Object findByDate(@RequestParam String date, @RequestParam int fieldId) {
        List<CourtRsv> rsvs = crService.findByDate(date, fieldId);
        //System.out.println(date);
        //System.out.println(rsvs);

        return new ResultMap().setStatus(SUCCESS).setData(rsvs);
    }

    @PostMapping("/add")
    public Object add(@RequestBody LimeCash limeCash) {
        int rsvData = lcService.addCourtRsv(limeCash);

        if (rsvData == 1) {
            return new ResultMap().setStatus(SUCCESS).setData(rsvData);
        } else {
            return new ResultMap().setStatus(FAIL).setData("코트 예약 실패!");
        }
    }
}
