package com.lime.controller;

import com.lime.domain.CourtRsv;
import com.lime.domain.LimeCash;
import com.lime.domain.User;
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
@RequestMapping("/rsv/court")
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

        System.out.println(rsvData);

        if (rsvData == 1) {
            return new ResultMap().setStatus(SUCCESS).setData(rsvData);
        } else {
            return new ResultMap().setStatus(FAIL).setData("코트 예약 실패!");
        }
    }

    @GetMapping("/getList")
    public Object findByUser(HttpSession session) {
        User user = (User) session.getAttribute("loginUser");

        log.debug(user.getUserId());

        if (user == null) {
            return new ResultMap()
                    .setStatus("FAIL")
                    .setData("유저 정보가 없습니다.");
        } else {
            return new ResultMap()
                    .setStatus("SUCCESS")
                    .setData(crService.findByUser(user.getUserId()));
        }
    }
}
