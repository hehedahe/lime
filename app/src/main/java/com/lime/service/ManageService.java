package com.lime.service;

import java.util.List;
import com.lime.domain.Field;
import com.lime.domain.User;

public interface ManageService {

  List<User> userList();

  User userGet(int no);

  int update(User manage);
  
  List<Field> fieldList();

  Field fieldGet(int no);

  int delete(int no);
}







