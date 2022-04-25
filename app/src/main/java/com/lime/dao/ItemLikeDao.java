package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.ItemLike;

@Mapper
public interface ItemLikeDao {
  List<ItemLike> findLike(int userId);
  int insert(ItemLike itemLike);
  int delete(ItemLike itemLike);
  int count(int itemId);
}
