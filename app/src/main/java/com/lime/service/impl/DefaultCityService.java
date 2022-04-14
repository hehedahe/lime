package com.lime.service.impl;

import com.lime.dao.CityDao;
import com.lime.domain.City;
import com.lime.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultCityService implements CityService {

    @Autowired
    CityDao cityDao;

    @Override
    public City findRegion(int regionId) {
        return cityDao.findRegion(regionId);
    }

    @Override
    public City findCity(String cityName, int regionId) {
        return cityDao.findCity(cityName, regionId);
    }

}
