package com.lime.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lime.dao.FieldDao;
import com.lime.domain.Field;
import com.lime.service.FieldService;

@Service
public class DefaultFieldService implements FieldService {

  @Autowired
  FieldDao fieldDao;

  @Override
  public List<Field> findByLatLng(float lat, float lng) {
    return fieldDao.findByLatLng(lat, lng);
  }

  @Override
  public List<Field> findAll() {
    return fieldDao.findAll();
  }

  @Override
  public Field getCourt(int fieldId) {
    return fieldDao.getCourt(fieldId);
  }
}
