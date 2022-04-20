package com.lime.dao;

import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.ItemImage;

@Mapper
public interface ItemImageDao {
  int insert(ItemImage itemImage);
}
