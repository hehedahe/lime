package com.lime.service;

import java.util.List;
import com.lime.domain.Classes;
import com.lime.domain.Club;
import com.lime.domain.Community;


public interface ManageReportService {

  //게시글 및 댓글, 신고글관리
  
  //클래스게시글 관리
  List<Classes> classList();
  Classes getClasses(int no);
  
  //커뮤니티게시글 관리
  List<Community> communityList();
  Community getCommunity(int no);
  
  //클럽게시글 관리
  List<Club> clubList();
  Club getClub(int no);
  
  
}
