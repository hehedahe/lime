package com.lime.dao;

import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.ItemLike;

@Mapper
public interface ItemLikeDao {
  int insert(ItemLike itemLike);
}
