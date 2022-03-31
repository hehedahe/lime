package com.lime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.Field;
import com.lime.domain.User;
import com.lime.service.ManageService;

@RestController 
public class ManageController {

  @Autowired
  ManageService manageService;

  //회원관리-회원리스트
  @RequestMapping("/manage/user/list")
  public Object userList() {
    return manageService.userList();
  }
  //회원관리-특정회원 정보 리스트
  @RequestMapping("/manage/user/get")
  public Object userGet(int no) {
    User manage = manageService.userGet(no);
    if (manage == null) {
      return "";
    }
    return manage;
  }
  //구장관리- 리스트

  /*
   * @RequestMapping("/manage/update") public Object update( Manage manage) { return
   * manageService.update(manage); }
   * 
   * @RequestMapping("/manage/delete") public Object delete(int no) { return
   * manageService.delete(no); }
   */
  
  //구장관리- 리스트
  @RequestMapping("/manage/field/list")
  public Object fieldList() {
    System.out.println(">>>>>>>>>>");
    Object obj=  manageService.fieldList();
    
    System.out.println(">>>>>>>>> obj: "+obj);
    return manageService.fieldList();
  }
  //회원관리-특정회원 정보 리스트
  @RequestMapping("/manage/field/get")
  public Object fieldGet(int no) {
    Field field = manageService.fieldGet(no);
    if (field == null) {
      return "";
    }
    return field;
  }
}




