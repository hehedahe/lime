package com.lime.service;

import com.lime.domain.UserLogin;

public interface UserLoginService {

  int add(UserLogin userLogin); // user table 에 add

  int memberAdd(UserLogin userLogin); // member table에 add
  
  UserLogin get(String email, String password);

  UserLogin get(String email);

}







