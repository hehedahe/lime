package com.lime.controller;

import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.lime.domain.UserLogin;
import com.lime.service.UserLoginService;

@RestController
public class UserLoginController {

  @Autowired
  UserLoginService userLoginService;

  @RequestMapping("/login/signup")
  public Object signUp(UserLogin userLogin) {
    if (userLoginService.add(userLogin) == 1) {
      return "success";
    } else {
      return "fail";
    }
  }

//  @RequestMapping("/login/signin")
//  public Object signin(String email, String password, boolean saveEmail, HttpServletResponse response, HttpSession session) {
//    Member loginUser = memberService.get(email, password);
//    if (loginUser == null) {
//      return "fail";
//    }
//
//    // 로그인이 성공하면, 
//    // 다른 요청을 처리할 때 로그인 회원의 정보를 사용할 있도록 세션에 보관한다.
//    session.setAttribute("loginUser", loginUser);
//
//    Cookie cookie = null;
//    if (saveEmail) {
//      // 클라이언트로 보낼 데이터인 쿠키에 이메일을 저장한다.
//      cookie = new Cookie("userEmail", email);
//    } else {
//      cookie = new Cookie("userEmail", "");
//      cookie.setMaxAge(0); // 클라이언트에게 해당 이름의 쿠키를 삭제하도록 요구한다.
//    }
//    response.addCookie(cookie); // 응답할 때 쿠키 정보를 응답헤더에 포함시킨다.
//
//    return "success";
//  }

//  @RequestMapping("/login/getLoginUser")
//  public Object getLoginUser(HttpSession session) {
//    Object member = session.getAttribute("loginUser");
//    if (member != null) {
//      return new ResultMap()
//          .setStatus(SUCCESS)
//          .setData(member);
//    } else {
//      return new ResultMap()
//          .setStatus(FAIL)
//          .setData("로그인 하지 않았습니다.");
//    }
//  }
//
//  @RequestMapping("/login/signout")
//  public Object signout(HttpSession session) {
//    session.invalidate();
//    return new ResultMap().setStatus(SUCCESS);
//  }

}










