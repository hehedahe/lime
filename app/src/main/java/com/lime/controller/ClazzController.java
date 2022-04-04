package com.lime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lime.service.ClazzService;

@RestController
public class ClazzController {

	@Autowired
	ClazzService clazzService;
	
	@RequestMapping("/class/list")
	public Object classList() {
		return clazzService.clazzList();
	}
	
	@RequestMapping("/class/add") {
		public Object 
	}
}
