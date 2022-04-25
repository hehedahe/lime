package com.lime.service;

import java.util.List;
import com.lime.domain.Clazz;
import com.lime.domain.User;

public interface ClazzService {
  List<Clazz> clazzList();
  List<Clazz> list(User writer);
  List<Clazz> listRegion(String regionName, User writer);
  List<Clazz> listCity(String regionName, String cityName, User writer);
  int add(Clazz clazz);
}
