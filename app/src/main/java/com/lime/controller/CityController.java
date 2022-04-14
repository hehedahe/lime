package com.lime.controller;

import com.lime.domain.City;
import com.lime.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/city")
public class CityController {

    @Autowired
    CityService cityService;

    @GetMapping("/findRegion")
    public City findRegion(int regionId) {
        return cityService.findRegion(regionId);
    }

    @GetMapping("/findCity")
    public City findCity(String cityName, int regionId) {

        return cityService.findCity(cityName, regionId);
    }


}
