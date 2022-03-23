package com.eomcs.mylist.service;

import java.util.List;
import com.eomcs.mylist.domain.Contact;

public interface ContactService {

  int add(Market contact);

  List<Market> list();

  Market get(int no);

  int update(Market contact);

  int delete(int no);
}
