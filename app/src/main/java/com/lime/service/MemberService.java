package com.lime.service;

import com.lime.domain.Member;

public interface MemberService {

  int add(Member member);

  Member get(String email, String password);

  Member get(String email);

}







