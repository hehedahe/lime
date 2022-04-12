package com.lime.service;

import com.lime.domain.UserLogin;

public interface UserLoginService {

  int add(UserLogin userLogin);

  UserLogin get(String email, String password);

  UserLogin get(String email);

}







