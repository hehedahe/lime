package com.lime.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.Field;
import com.lime.service.FieldService;

@RestController
@RequestMapping("/field")
public class FieldController {

  @Autowired
  FieldService fieldService;

  @GetMapping("/distancelist")
  public List<Field> findByLatLng(float lat, float lng) {
    return fieldService.findByLatLng(lat, lng);
  }

}
