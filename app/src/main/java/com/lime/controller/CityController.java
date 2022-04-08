package com.lime.controller;

import com.lime.domain.City;
import com.lime.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/city")
public class CityController {

    @Autowired
    CityService cityService;

    @GetMapping("findCity")
    public List<City> findCityLatlng(int cityId) {
        return cityService.findCityLatlng(cityId);
    }

    @GetMapping("findRegion")
    public List<City> findRegionLatlng(int regionId) {
        return cityService.findRegionLatlng(regionId);
    }
}
