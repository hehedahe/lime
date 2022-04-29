package com.lime.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.lime.domain.User;
import com.lime.domain.UserSignUp;

@Mapper  
public interface UserSignUpDao {

  // 페이지 마다 호출할 Dao



  // 멤버 유저 DAO 따로 필요 멤버 등록할 때는 각각 테이블에 insert시켜야함 유저DAO 이용해서 처음 insert 
  int insert(User user);

  int insert1(User user);

  int add(User user);

  //int insert(UserLogin userLogin); // user에 insert

  //int insert1(UserLogin userLogin); // member에 insert

  UserSignUp findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

  UserSignUp findByEmail(String email);


  String findPwd(String email);
}
