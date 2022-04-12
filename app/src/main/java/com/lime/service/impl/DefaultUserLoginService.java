package com.lime.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lime.dao.UserLoginDao;
import com.lime.domain.UserLogin;
import com.lime.service.UserLoginService;


@Service
public class DefaultUserLoginService implements UserLoginService {

  @Autowired
  UserLoginDao userLoginDao;

  @Override
  public int add(UserLogin userLogin) {
    return userLoginDao.insert(userLogin);
  }

  @Override
  public UserLogin get(String email, String password) {
    return userLoginDao.findByEmailAndPassword(email, password);
  }

  @Override
  public UserLogin get(String email) {
    return userLoginDao.findByEmail(email);
  }

}
