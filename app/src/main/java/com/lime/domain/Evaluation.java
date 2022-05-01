package com.lime.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Evaluation {
    private Integer mtchId;
    private String mtchDate;
    private String stTime;
    private String field;
    private String court;
    private String mtchType;
    private String mtchNum;
    private String courtType;
    private Integer lvId;
}
