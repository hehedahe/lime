package com.lime.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.lime.domain.ItemReply;

@Mapper
public interface ItemReplyDao {
  List<ItemReply> findReply(int no);
}
