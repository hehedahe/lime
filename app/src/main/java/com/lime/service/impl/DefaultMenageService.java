package com.lime.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lime.dao.ManageDao;
import com.lime.domain.Field;
import com.lime.domain.User;
import com.lime.service.ManageService;

@Service
public class DefaultMenageService implements ManageService {

    @Autowired
    ManageDao manageDao;

    @Transactional
    public List<User> userList() {
        return manageDao.findAll();
    }

    @Transactional
    public User userGet(int no) {
        User manage = manageDao.findByNo(no);
        return manage;
    }

    @Transactional
    public List<Field> fieldList() {
        return manageDao.findFieldAll();
    }

    @Transactional
    public Field fieldGet(int no) {
        return manageDao.findFieldByNo(no);
    }

    @Override
    public int userCount() {

        int userNo = manageDao.countUserAll();

        return userNo;
    }

    @Override
    public List<User> managerList() {
        return manageDao.findManagerAll();
    }
}







