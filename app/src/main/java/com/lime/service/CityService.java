package com.lime.service;

import com.lime.domain.City;
import java.util.List;

public interface CityService {

    List<City> findCityLatlng(int cityId);
    List<City> findRegionLatlng(int regionId);

}
