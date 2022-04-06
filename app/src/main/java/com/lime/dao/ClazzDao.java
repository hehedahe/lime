package com.lime.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.Clazz;
import com.lime.domain.Market;


@Mapper
public interface ClazzDao {
	List<Clazz> findAll();
	
	 int insert(Clazz clazz);
	 
	 List<Clazz> findByRegion(String regionName);
}
