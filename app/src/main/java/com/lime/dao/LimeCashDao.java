package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.LimeCash;

@Mapper
public interface LimeCashDao {
  int insertUse(LimeCash limeCash);
  int checkout(LimeCash limeCash);
  int findCash(int userId);
  int insertCash(LimeCash limeCash);
  List<LimeCash> findByUserId(int userId);
}
