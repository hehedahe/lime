package com.lime.dao;

import com.lime.domain.Evaluation;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EvaluationDao {

    List<Evaluation> findList(Integer userId);
    Evaluation findMtch(Integer mtchId);
}
