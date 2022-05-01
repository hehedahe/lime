package com.lime.service;

/*
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
     
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail() {
        
    	// 수신 대상을 담을 ArrayList 생성
        ArrayList<String> toUserList = new ArrayList<>();

        //수신대상 추가
        toUserList.add("ohchef2020@gmail.com");
        toUserList.add("dhsnfltkfkd@naver.com");
        
        int toUserSize = toUserList.size();
        
        // SimpleMailMessage (단순 텍스트 구성 메일 메세지 생성할 때 이용)
        SimpleMailMessage simpleMessage = new SimpleMailMessage();
        
        // 수신자 설
        simpleMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));
        
        // 메일제목
        simpleMessage.setSubject("Subject Sample");
        
        // 메일내용
        simpleMessage.setText("Text Sample");
        
        // 메일발송
        javaMailSender.send(simpleMessage);
    }
}
*/