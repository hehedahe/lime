package com.lime.dao;

import com.lime.domain.CourtRsv;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface CourtRsvDao {
    int insert(CourtRsv courtRsv);
    List<CourtRsv> findByDate(String date);
}
