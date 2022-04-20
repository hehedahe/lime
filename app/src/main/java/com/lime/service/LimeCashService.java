package com.lime.service;

import com.lime.domain.LimeCash;

public interface LimeCashService {
  int add(LimeCash limeCash);

  int checkout(LimeCash limeCash);
}
