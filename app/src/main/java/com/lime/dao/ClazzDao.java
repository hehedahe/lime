package com.lime.dao;

import java.util.List;

import com.lime.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.lime.domain.Clazz;

@Mapper
public interface ClazzDao {
  List<Clazz> findAll();
  int insert(Clazz clazz);
  List<Clazz> findAll(User writer);
  List<Clazz> findByRegion(@Param("regionName") String regionName, @Param("writer") User writer);
  List<Clazz> findByCity(@Param("regionName") String regionName, @Param("cityName") String cityName, @Param("writer") User writer);
  List<Clazz> findAllChecked(User writer);

}
