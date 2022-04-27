package com.lime.controller;

import java.io.File;
import java.io.FileInputStream;
import java.util.UUID;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.lime.domain.Clazz;
import com.lime.domain.User;
import com.lime.service.ClazzService;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;


@RestController
public class ClazzController {

  private static final Logger log = LogManager.getLogger(ClazzController.class);


  @Autowired
  ClazzService clazzService;


  @RequestMapping("/class/list")
  public Object list() {
    return clazzService.clazzList();
  }























  @RequestMapping("/class/open1")
  public Object open1(Clazz cls, MultipartFile file, HttpSession session) {

    User user = (User) session.getAttribute("loginUser");

    cls.setWriter(user);


    System.out.println("photo-----------------");
    System.out.println(cls.getPhoto());
    System.out.println("photo-----------------");


    System.out.println("-------file----------");
    System.out.println(file);
    System.out.println("-------file----------");

    try {
      cls.setPhoto(saveFile(file));
      System.out.println("---------------------");
      System.out.println(cls.getPhoto());
      System.out.println("---------------------");
    } catch(Exception e) {
      e.printStackTrace();
    }

    System.out.println("-----------------");
    System.out.println(file);
    System.out.println("-----------------");


    session.setAttribute("classOpen", cls);


    return "success";
  }


  @RequestMapping("/class/open2")
  public Object open2(String level, int perWeek, int cost, HttpServletResponse response, HttpSession session) {

    Clazz cls = (Clazz) session.getAttribute("classOpen");

    cls.setLevel(level);
    cls.setPerWeek(perWeek);
    cls.setCost(cost);
    session.setAttribute("classOpen", cls);
    return "success";
  }


  @RequestMapping("/class/open3")
  public Object open3(String tchrIntro, String dtlIntro, HttpServletResponse response, HttpSession session) {

    Clazz cls = (Clazz) session.getAttribute("classOpen");
    cls.setTchrIntro(tchrIntro);
    cls.setDtlIntro(dtlIntro);

    session.setAttribute("classOpen", cls);

    System.out.println(session.getAttribute("classOpen"));

    clazzService.add(cls);

    return "success";

  }


  @RequestMapping("/class/photo")
  public ResponseEntity<Resource> photo(String filename) {

    try {
      // 다운로드할 파일의 입력 스트림 자원을 준비한다.
      File downloadFile = new File("./upload/class/" + filename); // 다운로드 상대 경로 준비
      FileInputStream fileIn = new FileInputStream(downloadFile.getCanonicalPath()); // 다운로드 파일의 실제 경로를 지정하여 입력 스트림 준비
      InputStreamResource resource = new InputStreamResource(fileIn); // 입력 스트림을 입력 자원으로 포장

      // HTTP 응답 헤더를 준비한다.
      HttpHeaders header = new HttpHeaders();
      header.add("Cache-Control", "no-cache, no-store, must-revalidate");
      header.add("Pragma", "no-cache");
      header.add("Expires", "0");

      // 다운로드 파일명을 지정하고 싶다면 다음의 응답 헤더를 추가하라!
      // => 다운로드 파일을 지정하지 않으면 요청 URL이 파일명으로 사용된다.
      header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);



      //      // HTTP 응답 생성기를 사용하여 다운로드 파일의 응답 데이터를 준비한다.
      //      BodyBuilder http응답생성기 = ResponseEntity.ok(); // 요청 처리에 성공했다는 응답 생성기를 준비한다.
      //      http응답생성기.headers(header); // HTTP 응답 헤더를 설정한다.
      //      http응답생성기.contentLength(downloadFile.length()); // 응답 콘텐트의 파일 크기를 설정한다.
      //      http응답생성기.contentType(MediaType.APPLICATION_OCTET_STREAM); // 응답 데이터의 MIME 타입을 설정한다.
      //      
      //      // 응답 데이터를 포장한다.
      //      ResponseEntity<Resource> 응답데이터 = http응답생성기.body(resource);
      //      
      //      return 응답데이터; // 포장한 응답 데이터를 클라이언트로 리턴한다.

      return ResponseEntity.ok() // HTTP 응답 프로토콜에 따라 응답을 수행할 생성기를 준비한다.
          .headers(header) // 응답 헤더를 설정한다.
          .contentLength(downloadFile.length()) // 응답할 파일의 크기를 설정한다.
          .contentType(MediaType.APPLICATION_OCTET_STREAM) // 응답 콘텐트의 MIME 타입을 설정한다.
          .body(resource); // 응답 콘텐트를 생성한 후 리턴한다.

    } catch (Exception e) {
      //e.printStackTrace();
      System.out.println("요청한 파일이 없습니다!");
      return null;
    }
  }

  private String saveFile(MultipartFile file) throws Exception {
    if (file != null && file.getSize() > 0) { 
      // 파일을 저장할 때 사용할 파일명을 준비한다.
      String filename = UUID.randomUUID().toString();

      // 파일명의 확장자를 알아낸다.
      int dotIndex = file.getOriginalFilename().lastIndexOf(".");
      if (dotIndex != -1) {
        filename += file.getOriginalFilename().substring(dotIndex);
      }

      // 파일을 지정된 폴더에 저장한다.
      File photoFile = new File("./upload/class/" + filename); // App 클래스를 실행하는 프로젝트 폴더
      file.transferTo(photoFile.getCanonicalFile()); // 프로젝트 폴더의 전체 경로를 전달한다.

      // 썸네일 이미지 파일 생성
      Thumbnails.of(photoFile)
      .size(50, 50)
      .crop(Positions.CENTER)
      .outputFormat("jpg")
      .toFile(new File("./upload/class/" + "50x50_" + filename));

      return filename;

    } else {
      return null;
    }
  }


  /*

  @RequestMapping("/class/list/1")
  public Object list(String regionName, String cityName) {
    System.out.println(regionName);
    System.out.println(cityName);
    if (regionName.equals("지역") || regionName.equals("전체")) {
      System.out.println(regionName);
      return clazzService.clazzList();
    }

    if (cityName.equals("도시")) {
      System.out.println(regionName);
      return clazzService.regionList(regionName);
    }

    return clazzService.cityList(regionName, cityName);

  }
   */

  /*
  @RequestMapping("/class/add")
  public Object add(Clazz clazz, MultipartFile file) {
    try {
      clazz.setImg(saveFile(file));
      return clazzService.add(clazz);
    } catch (Exception e) {
      e.printStackTrace();
      return "error!";
    }
  }
   */


}
