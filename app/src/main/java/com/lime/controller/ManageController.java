package com.lime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.Classes;
import com.lime.domain.Club;
import com.lime.domain.Community;
import com.lime.domain.Field;
import com.lime.domain.Market;
import com.lime.domain.User;
import com.lime.service.ManageReportService;
import com.lime.service.ManageService;

@RestController 
public class ManageController {

  @Autowired
  ManageService manageService;//회원관리,구장관리
   @Autowired 
   ManageReportService manageReportService;//게시물관리 
   
   
  //회원관리-회원리스트
  @RequestMapping("/manage/user/list")
  public Object userList() {
    return manageService.userList();
  }
  //회원관리-특정회원 정보 리스트
  @RequestMapping("/manage/user/get")
  public Object userGet(int no) {
    User manage = manageService.userGet(no);
    if (manage == null) {
      return "";
    }
    return manage;
  }
  
  
  /*
   * @RequestMapping("/manage/user/userCount") public User userCount() {
   * 
   * User userCount = new User(); userCount.setUserCount(manageService.userCount());
   * 
   * return userCount; }
   */

//=========================================================  
  //구장관리- 리스트 조회
  @RequestMapping("/manage/field/list")
  public Object fieldList() {
    Object obj=  manageService.fieldList();
    System.out.println(obj);
    return manageService.fieldList();
  }
  //회원관리-특정회원 정보 리스트 조회
  @RequestMapping("/manage/field/get")
  public Object fieldGet(int no) {
    Field field = manageService.fieldGet(no);
    if (field == null) {
      return "";
    }
    return field;
  }

//=========================================================  
  //게시글 및 댓글, 신고글 관리
  
  //클래스게시글 조회
  @RequestMapping("/manage/class/list")
  public Object classList() {
    return  manageReportService.classList();
  }
  //특정 커뮤니티게시글 조회 
  @RequestMapping("/manage/class/get")
  public Object classGet(int no) {
    Classes classes = manageReportService.getClasses(no);
    if (classes == null) {
      return "";
    }
    return classes;
  }
  
  //커뮤니티게시글 조회
  @RequestMapping("/manage/community/list")
  public Object communityList() {
    return  manageReportService.communityList();
  }
  //특정 커뮤니티게시글 조회 
  @RequestMapping("/manage/community/get")
  public Object communityGet(int no) {
    Community community = manageReportService.getCommunity(no);
    if (community == null) {
      return "";
    }
    return community;
  }
  
  //클럽게시글 조회
  @RequestMapping("/manage/club/list")
  public Object clubList() {
    Object obj=  manageReportService.clubList();
    System.out.println(obj);
    return manageReportService.clubList();
  }
  //특정 클럽게시글 조회 
  @RequestMapping("/manage/club/get")
  public Object clubGet(int no) {
    Club club = manageReportService.getClub(no);
    if (club == null) {
      return "";
    }
    return club;
  }
  
  //마켓 조회
  @RequestMapping("/manage/market/list")
  public Object marketList() {
    return manageReportService.marketReportList();
  }
  @RequestMapping("/manage/marketCmt/list")
  public Object marketCmtList() {
    return manageReportService.marketCmtList();
  }

}




