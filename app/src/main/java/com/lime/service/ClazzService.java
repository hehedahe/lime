package com.lime.service;

import java.util.List;

import com.lime.domain.Clazz;
import com.lime.domain.Market;

public interface ClazzService {
	List<Clazz> clazzList();
	
	int add(Clazz clazz);
	
	List<Clazz> regionList(String regionName);

	List<Clazz> cityList(String regionName, String cityName);
}
