package com.lime.service;

import java.util.List;
import com.lime.domain.ItemLike;
import com.lime.domain.ItemReply;
import com.lime.domain.Market;

public interface MarketService {

  List<Market> list(String keyword);

  List<Market> listRegion(String regionName, String keyword);

  List<Market> listCity(String regionName, String cityName, String keyword);

  List<Market> listChecked(String keyword);

  List<Market> listRegionChecked(String regionName, String keyword);

  List<Market> listCityChecked(String regionName, String cityName, String keyword);

  List<Market> getWish(int userId);

  Market get(int no);

  int add(Market market, Object fileList);

  List<ItemLike> getLike(int userId);

  int add(ItemLike itemLike);

  int delete(ItemLike itemLike);

  int update(Market market);

  int updateState(Market market);

  int delete(Market market);

  List<ItemReply> getReply(int no);

  int addReply(ItemReply itemReply);

  int updateReply(ItemReply itemReply);

  int deleteReply(ItemReply itemReply);
}
