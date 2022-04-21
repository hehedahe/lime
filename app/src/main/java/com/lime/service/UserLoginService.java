package com.lime.service;

import com.lime.domain.UserLogin;

public interface UserLoginService {

  int insert (UserLogin userLogin);

  int insert1 (UserLogin userLogin);

  //int allAdd(UserLogin userLogin);

  int add(UserLogin userLogin); // user table 에 add

  int memberAdd(UserLogin userLogin); // member table에 add

  int add1(UserLogin userLogin);

  UserLogin get(String email, String password);

  UserLogin get(String email);

}







