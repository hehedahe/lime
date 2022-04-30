package com.lime.controller;

import java.util.Random;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.lime.domain.User;
import com.lime.service.UserSignUpService;


@RestController
public class UserSignUpController {

    @Autowired
    UserSignUpService userSignUpService;


    @RequestMapping("/signup/signup1")
    public Object signup(User user, HttpServletResponse response, HttpSession session) {

        System.out.println(">>>>>>>>>>>>>>>>" + user);


        // Member loginUser = memberService.get(email, password);
        //    if (loginUser == null) {
        //      return "fail";
        //    }
        // 로그인이 성공하면,
        // 다른 요청을 처리할 때 로그인 회원의 정보를 사용할 있도록 세션에 보관한다.

        String email = user.getEmail();

        session.setAttribute("loginUser", user);
        System.out.println(session.getAttribute("loginUser"));
        System.out.println(">>>>>>>>>>>>>>>>" + user);
        //Object sc = session.getAttribute("loginUser");

        session.setAttribute("loginUser", user);

        //    Cookie cookie = null;
        //
        //    cookie = new Cookie("userEmail", email);
        //
        //    response.addCookie(cookie);


        int userId = user.getUserId();
        System.out.println(userId);
        return "success";

    }

    @RequestMapping("/signup/signup2")
    public Object signUp2(String yy, String mm, String dd, String gender, HttpServletResponse response, HttpSession session) throws Exception {

        User user = (User) session.getAttribute("loginUser");
        String birthday = yy + "-" + mm + "-" + dd;
        user.setBrthDate(birthday);
        user.setGender(gender);


        System.out.println(user);
        int userId = user.getUserId();
        System.out.println(userId);


        session.setAttribute("loginUser", user);


        return 1;
    }


    @RequestMapping("/signup/signup3")
    public Object signUp3(int bankId, String accountNo, String accountHolder, HttpServletResponse response, HttpSession session) throws Exception {
        User user = (User) session.getAttribute("loginUser");
        user.setBankId(bankId);
        user.setAccountNo(accountNo);
        user.setAccountHolder(accountHolder);


        session.setAttribute("loginUser", user);

        System.out.println(user);
        return 1;
    }


    @RequestMapping("/signup/signup4")
    public Object signUp4(int regionId, int cityId, String scope, int preferDays, int preferWeekend,
                          String courtTypeName, String leftYn, int courtTypeId, HttpServletResponse response,
                          HttpSession session) throws Exception {

        User user = (User) session.getAttribute("loginUser");

        user.setRegionId(regionId);
        user.setCityId(cityId);
        user.setScope(scope);
        user.setPreferDays(preferDays);
        user.setPreferWeekend(preferWeekend);
        user.setCourtTypeId(courtTypeId);
        user.setLeftYn(leftYn);

        session.setAttribute("loginUser", user);

        System.out.println("userLogin>>>>>>>>>>>>>>" + user);

        userSignUpService.add1(user);

        return "success";

    }


    @PostMapping("/user/email")
    private String sendEmail(HttpServletRequest request, String email) {
        HttpSession session = request.getSession();

        System.out.println("email>>>>>>>>>>>>>>>>>" + email);


        return "success";
    }


    @RequestMapping("/get/email")
    public Object getEmail(String email) {

        System.out.println("-------------------");
        System.out.println(userSignUpService.findPwd(email));
        System.out.println("-------------------");


        return userSignUpService.findPwd(email);


    }


    @RequestMapping("/CheckMail")
    @ResponseBody
    public String SendMail(String mail, HttpSession session) {

        Random random = new Random();
        String key = "";

        //    SimpleMailMessage message = new SimpleMailMessage();
        //    message.setTo(mail); // 스크립트에서 보낸 메일을 받을 사용자 이메일 주소
        //    // 입력 키를 위한 코드
        //    for (int i = 0; i < 3; i++) {
        //      int index = random.nextInt(25) + 65; // A~Z까지 랜덤 알파벳 생성
        //      key += (char) index;
        //    }
        //    int numIndex = random.nextInt(8999) + 1000; // 4자리 정수를 생성
        //    key += numIndex;
        //    message.setSubject("인증번호 입력을 위한 메일 전송");
        //    message.setText("인증 번호 : " + key);
        //javaMailSender.send(message);

        return key;
    }
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



