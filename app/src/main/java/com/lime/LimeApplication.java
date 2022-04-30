package com.lime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.web.bind.annotation.RestController;


@RestController
@SpringBootApplication
@ServletComponentScan
public class LimeApplication {

  public static void main(String[] args) {
    SpringApplication.run(LimeApplication.class, args);

  }
}

