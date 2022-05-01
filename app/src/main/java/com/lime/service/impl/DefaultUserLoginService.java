package com.lime.service.impl;

import org.apache.ibatis.annotations.Options;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lime.dao.UserSignUpDao;
import com.lime.domain.User;
import com.lime.domain.UserSignUp;
import com.lime.service.UserSignUpService;


@Service
public class DefaultUserLoginService implements UserSignUpService {

  @Autowired
  UserSignUpDao userLoginDao;


  @Override
  public int add(User user) { // 각각의 table에 insert
    return userLoginDao.insert(user);
  }
  /*
  @Override
  public int memberAdd(User user) { // 각각의 table에 insert
    return userLoginDao.insert1(user);
  }
   */

  @Override
  public UserSignUp get(String email, String password) {
    return userLoginDao.findByEmailAndPassword(email, password);
  }

  @Override
  public UserSignUp get(String email) {
    return userLoginDao.findByEmail(email);
  }

  @Override
  public int add1(User user) {
    userLoginDao.insert(user);
    userLoginDao.insert1(user);


    return 1;
  }



  @Override
  public int insert1(User user) {
    // TODO Auto-generated method stub
    return 0;
  }

  @Override
  public String findPwd(String email) {
    return userLoginDao.findPwd(email);
  }
  @Override
  public int memberAdd(UserSignUp userLogin) {
    // TODO Auto-generated method stub
    return 0;
  }

  @Override
  public int insert(User user) {
    // TODO Auto-generated method stub
    return 0;
  }


  //@Override
  //public int memberAdd(UserLogin userLogin) {
  //	return userLoginDao.insert(userLogin);
  //	}
}
