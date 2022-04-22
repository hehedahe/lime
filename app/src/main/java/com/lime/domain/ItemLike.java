package com.lime.domain;

import lombok.Data;

@Data
public class ItemLike {
  int itemId;
  int userId;
  UserLogin writer;
  boolean done;
}
