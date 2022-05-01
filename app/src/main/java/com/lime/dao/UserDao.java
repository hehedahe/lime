package com.lime.dao;

import com.lime.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper  
public interface UserDao {
  int insert(User user);
  User findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
  User findByEmail(String email);
  int update(User user);
}











