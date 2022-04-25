package com.lime.service.impl;

import java.util.List;

import com.lime.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lime.dao.ClazzDao;
import com.lime.domain.Clazz;
import com.lime.service.ClazzService;

@Service
public class DefaultClazzService implements ClazzService{

  @Autowired
  ClazzDao clazzDao;

  @Override
  @Transactional
  public List<Clazz> clazzList() {
    return clazzDao.findAll();
  }


  @Override
  @Transactional
  public int add(Clazz clazz) {
    clazzDao.insert(clazz);

    return 1;
  }

  @Override
  public List<Clazz> list(User writer) {
    return clazzDao.findAll(writer);
  }

  @Override
  public List<Clazz> listRegion(String regionName, User writer) {
    return clazzDao.findByRegion(regionName, writer);
  }

  @Override
  public List<Clazz> listCity(String regionName, String cityName, User writer) {
    return clazzDao.findByCity(regionName, cityName, writer);
  }


}
