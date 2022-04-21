package com.lime.controller;

import com.lime.domain.CourtRsv;
import com.lime.service.CourtRsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/court-rsv")
public class CourtRsvController {

    @Autowired
    CourtRsvService crService;

    @GetMapping("/get")
    public Object findByDate(@RequestParam String date, @RequestParam int fieldId) {
        List<CourtRsv> rsvs = crService.findByDate(date, fieldId);
        System.out.println(date);
        System.out.println(rsvs);
        return new ResultMap().setStatus("SUCCESS").setData(rsvs);
    }
}
