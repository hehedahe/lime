package com.lime.domain;

import lombok.Data;

@Data
public class CommunityCmt {
  int pNo; //게시글번호
  int cNo; //댓글번호
  String title; //게시글명
  String content; //댓글내용
  String rgtDate; //작성일
  String name; //댓글작성자이름
}
