package com.lime.service;

import java.util.List;
import com.lime.domain.Clazz;
import com.lime.domain.Member;

public interface ClazzService {
  List<Clazz> clazzList();


  List<Clazz> list(Member writer);

  List<Clazz> listRegion(String regionName, Member writer);

  List<Clazz> listCity(String regionName, String cityName, Member writer);




  int add(Clazz clazz);


}
