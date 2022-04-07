package com.lime.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.lime.domain.Clazz;
import com.lime.domain.Market;


@Mapper
public interface ClazzDao {
	List<Clazz> findAll();
	
	 int insert(Clazz clazz);
	 
	 List<Clazz> findByRegion(String regionName);
	 
	 List<Clazz> findByCity(@Param("regionName") String regionName, @Param("cityName") String cityName);
}
