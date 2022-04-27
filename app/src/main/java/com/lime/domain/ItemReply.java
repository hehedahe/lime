package com.lime.domain;

import lombok.Data;

@Data
public class ItemReply {
  int replyId;
  int itemId;
  int userId;
  String userName;
  String content;
  String rgtDate;
  String mdfyDate;

}
