package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.ItemReply;

@Mapper
public interface ItemReplyDao {
  List<ItemReply> find(int no);
  int insert(ItemReply itemReply);
  int update(ItemReply itemReply);
  int delete(ItemReply itemReply);
}
