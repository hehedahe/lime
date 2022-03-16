package com.lime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.dao.UserDao;
import com.lime.domain.User;
import com.lime.dao.UserDao;

@RestController
public class UserController {

  // @Autowired
  // - 필드 선언부에 이 애노테이션을 붙여서 표시해 두면,
  // Spring Boot가 UserController 객체를 만들 때 UserDao 구현체를 찾아 자동으로 주입한다.
  //
  @Autowired
  UserDao userDao;

  @RequestMapping("/user/get") 
  public Object get(int no) {
    
    User user = userDao.findByNo(no); 
   
    System.out.println("result  >>>>>>>>>"+user);
    return user; 
    }



  /*
   * @RequestMapping("/user/list") public Object list() { return userDao.findAll(); }
   */

  /*
   * @RequestMapping("/user/add") public Object add(User user) { return userDao.insert(user); }
   * 
   * 
   * @RequestMapping("/user/get") public Object get(int no) { User user = userDao.findByNo(no); if
   * (user == null) { return ""; } userDao.increaseViewCount(no); return user; }
   * 
   * @RequestMapping("/user/update") public Object update(User user) { return userDao.update(user);
   * }
   * 
   * @RequestMapping("/user/delete") public Object delete(int no) { return userDao.delete(no); }
   */
}


