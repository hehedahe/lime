package com.lime.service;

import com.lime.domain.User;
import com.lime.domain.UserSignUp;

public interface UserSignUpService {

  int insert (UserSignUp userLogin);

  int insert1 (UserSignUp userLogin);

  //int allAdd(UserLogin userLogin);

  int add(User user); // user table 에 add

  int memberAdd(UserSignUp userLogin); // member table에 add

  int add1(User user);

  UserSignUp get(String email, String password);

  UserSignUp get(String email);

  String findPwd(String email);

}







