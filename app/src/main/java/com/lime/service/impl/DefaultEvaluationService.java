package com.lime.service.impl;

import com.lime.dao.EvaluationDao;
import com.lime.domain.Evaluation;
import com.lime.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DefaultEvaluationService implements EvaluationService {

    @Autowired
    EvaluationDao evDao;

    @Override
    public List<Evaluation> findList(Integer userId) {
        return evDao.findList(userId);
    }

    @Override
    public Evaluation findMtch(Integer mtchId) {
        return evDao.findMtch(mtchId);
    }
}
