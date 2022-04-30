package com.lime.controller;

import java.util.ArrayList;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.Classes;
import com.lime.domain.Club;
import com.lime.domain.Community;
import com.lime.domain.Field;
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
  public Object userList(HttpSession session) {
    User userLogin = (User) session.getAttribute("loginUser");
    return manageService.userList();
  }
  //회원관리-회원리스트
  @RequestMapping("/manage/user/list1")
  public Object userList1(HttpSession session) {
    User userLogin = (User) session.getAttribute("loginUser");
    ArrayList<Object> list = new ArrayList<Object>();
    list.add(userLogin);
    list.add(manageService.userList());
    return list;
  }
  @RequestMapping("/manage/manager/list")
  public Object managerList(HttpSession session) {
    User userLogin = (User) session.getAttribute("loginUser");
    return manageService.managerList();
  }

  @RequestMapping("/manage/manager/list1")
  public Object managerList1(HttpSession session) {
    User userLogin = (User) session.getAttribute("loginUser");
    ArrayList<Object> list = new ArrayList<Object>();
    list.add(userLogin);
    list.add(manageService.managerList());
    
    System.out.println("list>>>>>>:::::"+ list);
    
    return list;
  }
  

  //회원관리-특정회원 정보 리스트
  @RequestMapping("/manage/user/get")
  public Object userGet(int no) {
    
    
    User manage = manageService.userGet(no);
    System.out.println("머가나올까ㅏ???????:::::::::::::::::::::::::::::"+manageService.userGet(no));
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
  public Object fieldList(HttpSession session) {
     
    User userLogin = (User) session.getAttribute("loginUser");
    return manageService.fieldList();
  }
  @RequestMapping("/manage/field/list1")
  public Object fieldList1(HttpSession session) {
     
    User userLogin = (User) session.getAttribute("loginUser");
    ArrayList<Object> list = new ArrayList<Object>();
    list.add(userLogin);
    list.add(manageService.fieldList());
    return list;
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
  
  @RequestMapping("/manage/class/list1")
  public Object classList1(HttpSession session) {
    User userLogin = (User) session.getAttribute("loginUser");
    ArrayList<Object> list = new ArrayList<Object>();
    list.add(userLogin);
    list.add(manageReportService.classList());
    return  list;
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
  
  //커뮤니티게시글 조회
  @RequestMapping("/manage/community/list1")
  public Object communityList1(HttpSession session) {
    User userLogin = (User) session.getAttribute("loginUser");
    ArrayList<Object> list = new ArrayList<Object>();
    list.add(userLogin);
    list.add(manageReportService.communityList());
    return list;
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
  
  @RequestMapping("/manage/club/list1")
  public Object clubList1(HttpSession session) {
    User userLogin = (User) session.getAttribute("loginUser");
    ArrayList<Object> list = new ArrayList<Object>();
    list.add(userLogin);
    list.add(manageReportService.clubList());
    return list;
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
  @RequestMapping("/manage/market/list1")
  public Object marketList1(HttpSession session) {
    User userLogin = (User) session.getAttribute("loginUser");
    ArrayList<Object> list = new ArrayList<Object>();
    list.add(userLogin);
    list.add(manageReportService.marketReportList());
    return list;
  }
  @RequestMapping("/manage/marketCmt/list")
  public Object marketCmtList() {
    return manageReportService.marketCmtList();
  }

}




