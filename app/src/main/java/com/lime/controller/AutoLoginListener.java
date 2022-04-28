package com.lime.controller;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.lime.domain.User;

//역할:
//- 요청이 들어 올 때, 기능 테스트를 위해 자동으로 로그인 시킨다.
//

//@WebListener
public class AutoLoginListener implements ServletRequestListener {
  @Override
  public void requestInitialized(ServletRequestEvent sre) {
    System.out.println("AutoLoginListener.requestInitialized() 호출됨!");
    User loginUser = new User();
    loginUser.setUserId(94);
    loginUser.setName("user94");

    HttpServletRequest httpRequest = (HttpServletRequest) sre.getServletRequest(); 
    HttpSession session = httpRequest.getSession();
    session.setAttribute("loginUser", loginUser);

    session.getAttribute("loginUser");
  }
}
