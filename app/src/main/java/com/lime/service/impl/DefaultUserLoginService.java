package com.lime.service.impl;

import org.apache.ibatis.annotations.Options;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lime.dao.UserSignUpDao;
import com.lime.domain.UserSignUp;
import com.lime.service.UserSignUpService;


@Service
public class DefaultUserLoginService implements UserSignUpService {

  @Autowired
  UserSignUpDao userLoginDao;

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
  public int add(UserSignUp userLogin) { // 각각의 table에 insert
    return userLoginDao.insert(userLogin);
  }

  @Override
  public int memberAdd(UserSignUp userLogin) { // 각각의 table에 insert
    return userLoginDao.insert1(userLogin);
  }


  @Override
  public UserSignUp get(String email, String password) {
    return userLoginDao.findByEmailAndPassword(email, password);
  }

  @Override
  public UserSignUp get(String email) {
    return userLoginDao.findByEmail(email);
  }

  @Override
  public int add1(UserSignUp userLogin) {
    userLoginDao.insert(userLogin);
    userLoginDao.insert1(userLogin);


    return 1;
  }

  @Override
  public int insert(UserSignUp userLogin) {
    // TODO Auto-generated method stub
    return 0;
  }

  @Override
  public int insert1(UserSignUp userLogin) {
    // TODO Auto-generated method stub
    return 0;
  }


  //@Override
  //public int memberAdd(UserLogin userLogin) {
  //	return userLoginDao.insert(userLogin);
  //	}
}
