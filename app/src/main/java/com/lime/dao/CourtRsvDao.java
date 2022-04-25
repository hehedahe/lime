package com.lime.dao;

import com.lime.domain.CourtRsv;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CourtRsvDao {
    int insert(CourtRsv courtRsv);
    List<CourtRsv> findByDate(@Param("date") String date, @Param("fieldId") int fieldId);
    List<CourtRsv> findByUser(int userId);
}
