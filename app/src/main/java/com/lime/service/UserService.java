package com.lime.service;

import com.lime.domain.User;

public interface UserService {
  int add(User user);
  User getLoginUser(String email, String password);
  User getUser(String email);
  int update(User user);
}







