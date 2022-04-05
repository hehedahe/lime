package com.lime.domain;

import lombok.Data;

@Data
public class Court {
  int no;
  int fieldNo;
  int courtTypeNo;
  String name;
  int fee;
  Field field;
}
