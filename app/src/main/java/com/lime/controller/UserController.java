package com.lime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.dao.UserDao;
import com.lime.domain.User;

@RestController 
public class UserController {

  @Autowired
  UserDao userDao;

  @RequestMapping("/user/list")
  public Object list() {
    return userDao.findAll(); 
  }

  @RequestMapping("/user/add")
  public Object add(User user) throws Exception {
    userDao.insert(user);
    return userDao.countAll();
  }

  @RequestMapping("/user/get")
  public Object get(int no) {
    User user = userDao.findByNo(no);
    return user != null ? user : "";
  }

  @RequestMapping("/user/update")
  public Object update(User user) throws Exception {
    return userDao.update(user);
  }

  @RequestMapping("/user/delete")
  public Object delete(int no) throws Exception {
    return userDao.delete(no);
  }

}




