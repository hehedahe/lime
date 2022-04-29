package com.lime.service;

import javax.servlet.http.HttpSession;

public interface MailService {

  void mailSend(HttpSession session, String email);

}
