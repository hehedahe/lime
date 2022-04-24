package com.lime.service;

import com.lime.domain.CourtRsv;

import java.util.List;

public interface CourtRsvService {
    List<CourtRsv> findByDate(String date, int fieldId);
    List<CourtRsv> findByUser(int UserId);
}
