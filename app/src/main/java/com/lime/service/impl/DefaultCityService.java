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
    public List<City> findCityLatlng(int cityId) {
        return cityDao.findCityLatlng(cityId);
    }

    @Override
    public List<City> findRegionLatlng(int regionId) {
        return cityDao.findRegionLatlng(regionId);
    }
}
