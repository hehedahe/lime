package com.lime.service;

import java.util.List;
import com.lime.domain.Field;

public interface FieldService {
  List<Field> findByLatLng(float lat, float lng);
  List<Field> findAll();
  Field getCourt(int fieldId);
}
