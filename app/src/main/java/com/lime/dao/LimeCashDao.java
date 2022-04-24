package com.lime.dao;

import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.LimeCash;

@Mapper
public interface LimeCashDao {
  int insert(LimeCash limeCash);
  int checkout(LimeCash limeCash);
  int findCash(int userId);
}
