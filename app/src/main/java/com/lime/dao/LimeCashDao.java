package com.lime.dao;

import com.lime.domain.LimeCash;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LimeCashDao {
    int insert(LimeCash limeCash);
}
