package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.ItemImage;

@Mapper
public interface ItemImageDao {
  int insert(ItemImage itemImage);
  List<ItemImage> findByNo(int no);
}
