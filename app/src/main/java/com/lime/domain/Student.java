package com.lime.domain;

import java.util.Date;
import lombok.Data;
import lombok.experimental.Accessors;


@Data
@Accessors(chain = true)
public class Student {

  String state;
  int clsRate;
  String review;
  Date rgtDate;

}
