package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.Market;

@Mapper
public interface MarketDao {

  int countAll();

  List<Market> findAll();

  List<Market> findByRegion(String regionName);

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
