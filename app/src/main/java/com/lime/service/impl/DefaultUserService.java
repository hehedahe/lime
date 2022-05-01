package com.lime.service.impl;

import com.lime.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lime.dao.UserDao;
import com.lime.service.UserService;

@Service
public class DefaultUserService implements UserService {

  @Autowired
  UserDao userDao;

  @Override
  public int add(User user) {
    return userDao.insert(user);
  }

  @Override
  public User getLoginUser(String email, String password) {
    return userDao.findByEmailAndPassword(email, password);
  }

  @Override
  public User getUser(String email) {
    return userDao.findByEmail(email);
  }

  @Override
  public int update(User user) {
    return userDao.update(user);
  }

}
