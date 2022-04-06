package com.lime.controller;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.Field;
import com.lime.service.FieldService;

@RestController
@RequestMapping("/field")
public class FieldController {

  private static final Logger log = LogManager.getLogger(FieldController.class);

  @Autowired
  FieldService fieldService;

  @GetMapping("/list")
  public List<Field> findAll() {
    return fieldService.findAll();
  }


  @GetMapping("/distancelist")
  public List<Field> findByLatLng(float lat, float lng) {
    log.debug("테니스장 리스트 불러오기");
    return fieldService.findByLatLng(lat, lng);
  }

}
