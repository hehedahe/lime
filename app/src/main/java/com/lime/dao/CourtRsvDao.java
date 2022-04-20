package com.lime.dao;

import com.lime.domain.CourtRsv;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CourtRsvDao {
    int insert(CourtRsv courtRsv);
}
