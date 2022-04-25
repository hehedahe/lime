package com.lime.service;

import com.lime.domain.UserSignUp;

public interface UserSignUpService {

  int insert (UserSignUp userLogin);

  int insert1 (UserSignUp userLogin);

  //int allAdd(UserLogin userLogin);

  int add(UserSignUp userLogin); // user table 에 add

  int memberAdd(UserSignUp userLogin); // member table에 add

  int add1(UserSignUp userLogin);

  UserSignUp get(String email, String password);

  UserSignUp get(String email);

}







