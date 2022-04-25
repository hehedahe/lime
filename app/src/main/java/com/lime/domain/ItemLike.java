package com.lime.domain;

import lombok.Data;

@Data
public class ItemLike {
  int userId;
  int itemId;
  boolean done;
  int likeCount;

  User writer;

}
