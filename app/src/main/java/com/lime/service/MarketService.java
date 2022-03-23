package com.lime.service;

import java.util.List;
import com.lime.domain.Market;

public interface MarketService {

  //int add(Market contact);

  List<Market> list();

  List<Market> listRegion(String regionName);

  //Market get(int no);

  //int update(Market contact);

  //int delete(int no);
}
