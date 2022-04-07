package com.lime.dao;

import com.lime.domain.City;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CityDao {

    List<City> findCityLatlng(int cityId);
    List<City> findRegionLatlng(int regionId);

}
