package com.lime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.dao.UserDao;
import com.lime.domain.User;
import com.lime.dao.UserDao;

@Controller
public class UserController {

  // @Autowired
  // - 필드 선언부에 이 애노테이션을 붙여서 표시해 두면, 
  //   Spring Boot가 UserController 객체를 만들 때 UserDao 구현체를 찾아 자동으로 주입한다. 
  //
  @Autowired
  UserDao userDao;

  @RequestMapping("/board/list")
  public Object list() {
    return userDao.findAll();
  }

  @RequestMapping("/board/add")
  public Object add(User board) {
    return userDao.insert(board);
  }


  @RequestMapping("/board/get")
  public Object get(int no) {
    User board = userDao.findByNo(no);
    if (board == null) {
      return "";
    }
    userDao.increaseViewCount(no);
    return board;
  }

  @RequestMapping("/board/update")
  public Object update(User board) {
    return userDao.update(board);
  }

  @RequestMapping("/board/delete")
  public Object delete(int no) {
    return userDao.delete(no);
  }
}




