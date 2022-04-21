package com.lime.service;

import java.util.List;
import com.lime.domain.Field;
import com.lime.domain.User;

public interface ManageService {

  List<User> userList();
  
  List<User> managerList();

  int userCount();
  
  User userGet(int no);

  
  List<Field> fieldList();

  Field fieldGet(int no);

}







