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
public class CourtRsv {
    int fieldId;
    String courtId;
    String dateTime;
    int limeId;
    Date rgtDate;
    String state;
}
