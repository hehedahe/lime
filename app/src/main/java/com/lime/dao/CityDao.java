package com.lime.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.lime.domain.City;

@Mapper
public interface CityDao {

  City findRegion(int regionId);
  City findCity(@Param("cityName")String cityName, @Param("regionId") int regionId);


}
