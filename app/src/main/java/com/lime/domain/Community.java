package com.lime.domain;

import lombok.Data;

//커뮤니티 게시글 VO
@Data
public class Community {
  int no;
  int postId;
  String title;
  String name;
  String rgtDate;    
}
