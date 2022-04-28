package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.lime.domain.Market;

@Mapper
public interface MarketDao {

  //  int countAll();
  //
  List<Market> findAll(String keyword);

  List<Market> findByRegion(@Param("regionName") String regionName, @Param("keyword") String keyword);

  List<Market> findByCity(@Param("regionName") String regionName, @Param("cityName") String cityName, @Param("keyword") String keyword);

  List<Market> findAllChecked(String keyword);

  List<Market> findByRegionChecked(@Param("regionName") String regionName, @Param("keyword") String keyword);

  List<Market> findByCityChecked(@Param("regionName") String regionName, @Param("cityName") String cityName, @Param("keyword") String keyword);

  Market findByNo(int no);

  List<Market> findWish(int userId);

  int insert(Market market);

  int update(Market market);

  int updateState(Market market);

  int increaseViewCount(int no);

  int delete(Market market);
  //
  //  Market findByEmail(String email);
  //
  //  List<Market> findByName(String name);
  //
  //  int update(Market contact);
  //

  //
  //  List<ContactTel> findTelByContactNo(int contactNo);
  //
  //  int insertTel(ContactTel tel);
  //
  //  int insertTels(@Param("contactNo") int contactNo, @Param("tels") List<ContactTel> tels);
  //
  //  int updateTel(ContactTel tel);
  //
  //  int deleteTel(int telNo);
  //
  //  int deleteTelByContactNo(int contactNo);
}
