package com.lime.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.lime.domain.Classes;
import com.lime.domain.Club;
import com.lime.domain.Community;
import com.lime.domain.ManageMaket;
import com.lime.domain.Market;


@Mapper
public interface ManageReportDao {

  //관리자-게시글 및 댓글 , 신고글 관리
  
  //클래스게시글관리
  List<Classes> findClassAll();
  Classes findClassByNo(int no); 
  
  //커뮤니티게시글관리 
  List<Community> findCommunityAll();
  Community findCommunityByNo(int no);
  
  //클럽게시글관리
  List<Club> findClubAll();
  Club findClubByNo(int no);
  
  //마켓관리
  List<ManageMaket> findMaketReportAll();
  /* Market findItemByNo(int no); */
  List<Market> findItemCmtAll();
  
}
