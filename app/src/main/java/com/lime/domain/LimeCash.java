package com.lime.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import java.sql.Date;

@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LimeCash {
    int limeId;
    int userId;
    int amt;
    Date date;
    String typeUse;
    CourtRsv courtRsv;
}
