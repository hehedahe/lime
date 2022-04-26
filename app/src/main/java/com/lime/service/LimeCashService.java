package com.lime.service;

import java.util.List;
import com.lime.domain.LimeCash;

public interface LimeCashService {
  int addCourtRsv(LimeCash limeCash);
  int checkout(LimeCash limeCash);
  int findCash(int userId);
  int addCash(LimeCash limeCash);
  List<LimeCash> findByUserId(int userId);
}
