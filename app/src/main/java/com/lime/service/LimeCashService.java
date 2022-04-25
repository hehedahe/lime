package com.lime.service;

import com.lime.domain.LimeCash;

public interface LimeCashService {
  int addCourtRsv(LimeCash limeCash);
  int checkout(LimeCash limeCash);
  int findCash(int userId);
  int addCash(LimeCash limeCash);
}
