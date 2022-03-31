package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.lime.domain.Market;

@Mapper
public interface MarketDao {

  //  int countAll();
  //
  List<Market> findAll();

  List<Market> findByRegion(String regionName);

  List<Market> findByCity(@Param("regionName") String regionName, @Param("cityName") String cityName);

  List<Market> findAllChecked();

  List<Market> findByRegionChecked(String regionName);

  List<Market> findByCityChecked(@Param("regionName") String regionName, @Param("cityName") String cityName);

  //  int insert(Market contact);
  //
  //  Market findByNo(int no);
  //
  //  Market findByEmail(String email);
  //
  //  List<Market> findByName(String name);
  //
  //  int update(Market contact);
  //
  //  int delete(int no);
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
