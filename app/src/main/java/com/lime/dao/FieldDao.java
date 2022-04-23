package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.lime.domain.Field;

@Mapper
public interface FieldDao {
  List<Field> findByLatLng(@Param("preferLat")float preferLat, @Param("preferLng")float preferLng);
  List<Field> findAll();
  Field getCourt(int fieldId);
}
