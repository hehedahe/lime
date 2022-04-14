package com.lime.service;

import com.lime.domain.City;

import java.util.HashMap;
import java.util.List;

public interface CityService {
    City findRegion(int regionId);
    City findCity(String cityName, int regionId);


}
