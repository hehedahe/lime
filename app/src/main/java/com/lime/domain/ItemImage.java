package com.lime.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ItemImage {
  int imgId;
  int itemId;
  String filePath;
}
