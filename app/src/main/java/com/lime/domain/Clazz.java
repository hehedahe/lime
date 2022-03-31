package com.lime.domain;

import java.util.Date;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors
public class Clazz {
	int no;
	int userId;
	int cityId;
	String title;
	String intro;
	int cost;
	String startDate;
	String endDate;
	int perWeek;
	String level;
	String tchrIntro;
	String dtlIntro;
	Date rgtDate;
	Date mdfyDate;
	
}
