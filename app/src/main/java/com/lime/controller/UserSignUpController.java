package com.lime.controller;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.UserSignUp;
import com.lime.service.UserSignUpService;


@RestController
public class UserSignUpController {

  @Autowired
  UserSignUpService userLoginService;


  @RequestMapping("/signup/signup1")
  public Object signup(UserSignUp userLogin, HttpServletResponse response, HttpSession session) {

    System.out.println(">>>>>>>>>>>>>>>>" + userLogin);


    // Member loginUser = memberService.get(email, password);
    //    if (loginUser == null) {
    //      return "fail";
    //    }
    // 로그인이 성공하면, 
    // 다른 요청을 처리할 때 로그인 회원의 정보를 사용할 있도록 세션에 보관한다.

    String email = userLogin.getEmail();

    session.setAttribute("loginUser", userLogin);
    System.out.println(session.getAttribute("loginUser"));
    System.out.println(">>>>>>>>>>>>>>>>" + userLogin);
    //Object sc = session.getAttribute("loginUser");  

    session.setAttribute("loginUser", userLogin);

    //    Cookie cookie = null;
    //
    //    cookie = new Cookie("userEmail", email);
    //
    //    response.addCookie(cookie); 


    int userId = userLogin.getUserId();
    System.out.println(userId);
    return "success";

  }

  @RequestMapping("/signup/signup2") 
  public Object signUp2(String yy, String mm, String dd, String gender, HttpServletResponse response, HttpSession session) throws Exception {

    UserSignUp userLogin = (UserSignUp) session.getAttribute("loginUser");
    String birthday = yy+"-"+mm+"-"+dd;
    userLogin.setBrthDate(birthday);       
    userLogin.setGender(gender);

    System.out.println(userLogin);
    int userId = userLogin.getUserId();
    System.out.println(userId);


    session.setAttribute("loginUser", userLogin);

    //    Cookie cookie = null;
    //
    //    cookie = new Cookie("birthDay", birthday);
    //    cookie = new Cookie("gender", gender);
    //
    //    response.addCookie(cookie); 


    return 1;
  } 

  @RequestMapping("/signup/signup3") 
  public Object signUp3(int bankId, String accountNo, String accountHolder, HttpServletResponse response, HttpSession session) throws Exception {
    UserSignUp userLogin = (UserSignUp) session.getAttribute("loginUser");
    userLogin.setBankId(bankId);
    userLogin.setAccountNo(accountNo);
    userLogin.setAccountHolder(accountHolder);


    session.setAttribute("loginUser", userLogin);

    System.out.println(userLogin);
    return 1;
  }



  @RequestMapping("/signup/signup4") 
  public Object signUp4(int regionId, int cityId, 
      String scope, int preferDays, int preferWeekend, String courtTypeName, String leftYn, 
      int courtTypeId, HttpServletResponse response, HttpSession session) throws Exception {

    UserSignUp userLogin = (UserSignUp) session.getAttribute("loginUser");;

    userLogin.setRegionId(regionId);
    userLogin.setCityId(cityId);
    userLogin.setScope(scope);
    userLogin.setPreferDays(preferDays);
    userLogin.setPreferWeekend(preferWeekend);
    userLogin.setCourtTypeId(courtTypeId);
    userLogin.setLeftYn(leftYn);



    session.setAttribute("loginUser", userLogin);

    System.out.println("userLogin>>>>>>>>>>>>>>" + userLogin);

    userLoginService.add1(userLogin);

    return "success";

  }

  /*
  @RequestMapping("/login/signup")
  public Object signUp(UserLogin userLogin) {
    if (userLoginService.add(userLogin) == 1) { //첫번째로 user에 add() 
    	userLoginService.memberAdd(userLogin); // 두번째로 memeber에 add()
      return "success";
    } else {
      return "fail";
    }
  } 
   */


  /*
  @RequestMapping("/login/signup")
  public Object signUp(UserLogin userLogin) {
	  UserLogin user = new UserLogin();
	  //int id = ((Integer) sqlMap.insert("user.insertUserAndGetId")).intValue();
	  System.out.println("user>>>>>>>>>>" + user.getUserId());
    if (userLoginService.add(userLogin) == 1) { //첫번째로 user에 add() 

    	//userLoginService.memberAdd(userLogin); // 두번째로 memeber에 add()
      return "success";
    } else {
      return "fail";
    }
  }
   */

  //  @RequestMapping("login/signup1") 
  //	public Object signUp1 (UserLogin userLogin) {
  //		userLoginService.memberAdd(userLogin);
  //		return "success";
  //	}


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

