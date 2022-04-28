package com.lime.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ItemReply {
  int replyId;
  int itemId;
  int userId;
  String userName;
  String content;
  String rgtDate;
  String mdfyDate;

  User writer;
}
