package com.lime.controller;

import java.io.File;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.lime.domain.Field;
import com.lime.domain.User;
import com.lime.service.ManageService;

@RestController 
public class ManageController {

  @Autowired
  ManageService manageService;

  //회원관리-회원리스트
  @RequestMapping("/manage/user/list")
  public Object userList() {
    return manageService.userList();
  }
  //회원관리-특정회원 정보 리스트
  @RequestMapping("/manage/user/get")
  public Object userGet(int no) {
    User manage = manageService.userGet(no);
    if (manage == null) {
      return "";
    }
    return manage;
  }
  //구장관리- 리스트

  /*
   * @RequestMapping("/manage/update") public Object update( Manage manage) { return
   * manageService.update(manage); }
   * 
   * @RequestMapping("/manage/delete") public Object delete(int no) { return
   * manageService.delete(no); }
   */
  
  //구장관리- 리스트
  @RequestMapping("/manage/field/list")
  public Object fieldList() {
    Object obj=  manageService.fieldList();
    System.out.println(obj);
    return manageService.fieldList();
  }
  //회원관리-특정회원 정보 리스트
  @RequestMapping("/manage/field/get")
  public Object fieldGet(int no) {
    Field field = manageService.fieldGet(no);
    if (field == null) {
      return "";
    }
    return field;
  }
  
  /*
   * private String saveFile(MultipartFile file) throws Exception { if (file != null &&
   * file.getSize() > 0) { // 파일을 저장할 때 사용할 파일명을 준비한다. String filename =
   * UUID.randomUUID().toString();
   * 
   * // 파일명의 확장자를 알아낸다. int dotIndex = file.getOriginalFilename().lastIndexOf("."); if (dotIndex !=
   * -1) { filename += file.getOriginalFilename().substring(dotIndex); }
   * 
   * // 파일을 지정된 폴더에 저장한다. File photoFile = new File("./upload/book/" + filename); // App 클래스를 실행하는
   * 프로젝트 폴더 file.transferTo(photoFile.getCanonicalFile()); // 프로젝트 폴더의 전체 경로를 전달한다.
   * 
   * // 썸네일 이미지 파일 생성 Thumbnails.of(photoFile) .size(50, 50) .crop(Positions.CENTER)
   * .outputFormat("jpg") .toFile(new File("./upload/book/" + "50x50_" + filename));
   * 
   * return filename;
   * 
   * } else { return null; } }
   */
  
  
}




