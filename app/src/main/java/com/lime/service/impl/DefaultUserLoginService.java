package com.lime.service.impl;

import org.apache.ibatis.annotations.Options;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lime.dao.UserLoginDao;
import com.lime.domain.UserLogin;
import com.lime.service.UserLoginService;


@Service
public class DefaultUserLoginService implements UserLoginService {

  @Autowired
  UserLoginDao userLoginDao;

  @Options(useGeneratedKeys = true, keyProperty = "userId")
  @Transactional

  /*
  @Override
  public int allAdd(UserLogin userLogin) {
    userLoginDao.page1(userLogin);
    userLoginDao.page2(userLogin);
    userLoginDao.page3(userLogin);
    userLoginDao.page4(userLogin);

    return 1;
  }
   */

  @Override
  public int add(UserLogin userLogin) { // 각각의 table에 insert
    return userLoginDao.insert(userLogin);
  }

  @Override
  public int memberAdd(UserLogin userLogin) { // 각각의 table에 insert
    return userLoginDao.insert1(userLogin);
  }


  @Override
  public UserLogin get(String email, String password) {
    return userLoginDao.findByEmailAndPassword(email, password);
  }

  @Override
  public UserLogin get(String email) {
    return userLoginDao.findByEmail(email);
  }

  @Override
  public int add1(UserLogin userLogin) {
    userLoginDao.insert(userLogin);
    userLoginDao.insert1(userLogin);


    return 1;
  }

  @Override
  public int insert(UserLogin userLogin) {
    // TODO Auto-generated method stub
    return 0;
  }

  @Override
  public int insert1(UserLogin userLogin) {
    // TODO Auto-generated method stub
    return 0;
  }


  //@Override
  //public int memberAdd(UserLogin userLogin) {
  //	return userLoginDao.insert(userLogin);
  //	}
}
