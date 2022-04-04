package com.lime.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lime.dao.ManageReportDao;
import com.lime.domain.Classes;
import com.lime.domain.Club;
import com.lime.domain.Community;
import com.lime.service.ManageReportService;

@Service
public class DefaultManageReportService implements ManageReportService {

  @Autowired
  ManageReportDao manageReportDao;
  
  //게시글 및 댓글,신고글관리
  
  //클래스게시글관리
  @Override
  public List<Classes> classList() {
    return manageReportDao.findClassAll();
  }
  
  @Override
  public Classes getClasses(int no) {
    return manageReportDao.findClassByNo(no);
  }

  //클럽게시글관리
  @Override
  public List<Club> clubList() {
    return manageReportDao.findClubAll();
  }

  @Override
  public Club getClub(int no) {
    return manageReportDao.findClubByNo(no);
  }

  //커뮤니티게시글관리
  @Override
  public List<Community> communityList() {
    return manageReportDao.findCommunityAll();
  }

  @Override
  public Community getCommunity(int no) {
    return manageReportDao.findCommunityByNo(no);
  }

}
