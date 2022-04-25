package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.lime.domain.Clazz;
import com.lime.domain.Member;

@Mapper
public interface ClazzDao {

  List<Clazz> findAll();

  int insert(Clazz clazz);


  List<Clazz> findAll(Member writer);

  List<Clazz> findByRegion(@Param("regionName") String regionName, @Param("writer") Member writer);

  List<Clazz> findByCity(@Param("regionName") String regionName, @Param("cityName") String cityName, @Param("writer") Member writer);

  List<Clazz> findAllChecked(Member writer);

}
