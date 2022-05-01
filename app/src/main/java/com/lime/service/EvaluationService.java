package com.lime.service;

import com.lime.domain.Evaluation;

import java.util.List;

public interface EvaluationService {
    List<Evaluation> findList(Integer userId);
    Evaluation findMtch(Integer mtchId);
}
