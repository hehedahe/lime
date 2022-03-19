package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.User;

@Mapper
public interface UserDao {

  int countAll(); // ==> <select id="com.eomcs.mylist.dao.ContactDao.countAll">...</select> 

  List<User> findAll();

  int insert(User user);

  User findByNo(int no);

  User findByEmail(String email);

  List<User> findByName(String name);

  int update(User user);

  int delete(int no);
}











