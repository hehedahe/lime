package com.lime.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.lime.domain.UserLogin;

@Mapper  
public interface UserLoginDao {

  int insert(UserLogin userLogin);
  
  int insert2();

  UserLogin findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

  UserLogin findByEmail(String email);
}











