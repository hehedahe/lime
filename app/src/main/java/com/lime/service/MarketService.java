package com.lime.service;

import java.util.List;
import com.lime.domain.Market;

public interface MarketService {

  //int add(Market contact);

  List<Market> list(String keyword);

  List<Market> listRegion(String regionName, String keyword);

  List<Market> listCity(String regionName, String cityName, String keyword);

  List<Market> listChecked(String keyword);

  List<Market> listRegionChecked(String regionName, String keyword);

  List<Market> listCityChecked(String regionName, String cityName, String keyword);

  //Market get(int no);

  //int update(Market contact);

  //int delete(int no);
}
