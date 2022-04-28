package com.lime.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lime.dao.ItemImageDao;
import com.lime.dao.ItemLikeDao;
import com.lime.dao.ItemReplyDao;
import com.lime.dao.MarketDao;
import com.lime.domain.ItemImage;
import com.lime.domain.ItemLike;
import com.lime.domain.ItemReply;
import com.lime.domain.Market;
import com.lime.service.MarketService;

@Service
public class DefaultMarketService implements MarketService {

  @Autowired
  MarketDao marketDao;

  @Autowired
  ItemImageDao itemImageDao;

  @Autowired
  ItemLikeDao itemLikeDao;

  @Autowired
  ItemReplyDao itemReplyDao;

  //  @Override
  //  @Transactional // 다음 메서드는 트랜잭션 안에서 실행하도록 설정한다.
  //  public int add(Market market) {
  //    contactDao.insert(contact);
  //    contactDao.insertTels(contact.getNo(), contact.getTels());
  //    return 1;
  //  }
  //
  @Override
  public List<Market> list(String keyword) {
    return marketDao.findAll(keyword);
  }

  @Override
  public List<Market> listRegion(String regionName, String keyword) {
    return marketDao.findByRegion(regionName, keyword);
  }

  @Override
  public List<Market> listCity(String regionName, String cityName, String keyword) {
    return marketDao.findByCity(regionName, cityName, keyword);
  }

  @Override
  public List<Market> listChecked(String keyword) {
    return marketDao.findAllChecked(keyword);
  }

  @Override
  public List<Market> listRegionChecked(String regionName, String keyword) {
    return marketDao.findByRegionChecked(regionName, keyword);
  }

  @Override
  public List<Market> listCityChecked(String regionName, String cityName, String keyword) {
    return marketDao.findByCityChecked(regionName, cityName, keyword);
  }


  @Override
  public Market get(int no) {
    Market market = marketDao.findByNo(no);
    market.setLikeCount(itemLikeDao.count(market.getItemId()));
    if (market != null) {
      marketDao.increaseViewCount(no);
    }
    return market;
  }


  @Override
  @Transactional
  public int add(Market market, Object fileList) {
    System.out.println(fileList);
    System.out.println(market);
    marketDao.insert(market);
    @SuppressWarnings("rawtypes")
    ArrayList fileNames = (ArrayList) fileList;
    ItemImage itemImage = new ItemImage();
    for (int i = 0; i < fileNames.size(); i++) {
      System.out.println(fileNames.get(i));
      String fileName = (String) fileNames.get(i);
      itemImage.setItemId(market.getItemId()).setFilePath(fileName);

      itemImageDao.insert(itemImage);
    }
    return 100;
  }

  @Override
  @Transactional
  public int update(Market market) {
    int count = marketDao.update(market);
    return count;
  }

  @Override
  @Transactional
  public int updateState(Market market) {
    int count = marketDao.updateState(market);
    return count;
  }

  @Override
  @Transactional
  public int delete(Market market) {
    return marketDao.delete(market);
    //return contactDao.delete(no);
  }

  @Override
  public List<ItemLike> getLike(int userId) {
    return itemLikeDao.findLike(userId);
  }

  @Override
  @Transactional
  public int add(ItemLike itemLike) {
    itemLikeDao.insert(itemLike);
    return 1000;
  }

  @Override
  @Transactional
  public int delete(ItemLike itemLike) {
    itemLikeDao.delete(itemLike);
    return 1000;
  }

  @Override
  public List<Market> getWish(int userId) {
    return marketDao.findWish(userId);
  }

  @Override
  public List<ItemReply> getReply(int no) {
    return itemReplyDao.find(no);
  }

  @Override
  public int addReply(ItemReply itemReply) {
    itemReplyDao.insert(itemReply);
    return 1;
  }

  @Override
  public int updateReply(ItemReply itemReply) {
    itemReplyDao.update(itemReply);
    return 1;
  }

  @Override
  public int deleteReply(ItemReply itemReply) {
    itemReplyDao.delete(itemReply);
    return 1;
  }

  //  @Override
  //  @Transactional
  //  public int update(Market contact) {
  //    int count = contactDao.update(contact);
  //    if (count > 0) {
  //      contactDao.deleteTelByContactNo(contact.getNo()); // 전화번호 변경 전에 기존 전화번호를 모두 삭제한다.
  //      contactDao.insertTels(contact.getNo(), contact.getTels()); // 전화번호 객체에 안에 이미 연락처 번호가 저장되어 있다.
  //    }
  //    return count;
  //  }
  //

}
