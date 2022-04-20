package com.lime.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lime.dao.MemberDao;
import com.lime.domain.Member;
import com.lime.service.MemberService;

@Service
public class DefaultMemberService implements MemberService {

  @Autowired
  MemberDao memberDao;

  @Override
  public int add(Member member) {
    return memberDao.insert(member);
  }

  @Override
  public Member getLoginUser(String email, String password) {
    return memberDao.findByEmailAndPassword(email, password);
  }

  @Override
  public Member getUser(String email) {
    return memberDao.findByEmail(email);
  }

}
