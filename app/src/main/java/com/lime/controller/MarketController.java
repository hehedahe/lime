package com.lime.controller;

import static com.lime.controller.ResultMap.FAIL;
import static com.lime.controller.ResultMap.SUCCESS;
import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
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
import com.lime.domain.ItemLike;
import com.lime.domain.ItemReply;
import com.lime.domain.Market;
import com.lime.domain.User;
import com.lime.service.MarketService;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

@RestController 
public class MarketController {

  private static final Logger log = LogManager.getLogger(MarketController.class);

  @Autowired
  MarketService marketService; // 클래스 대신 인터페이스를 지정한다.

  @RequestMapping("/market/list")
  public Object list(String regionName, String cityName, boolean checked, String keyword) {

    log.info("게시물 목록 조회!");

    if (checked == false) {
      log.debug("키워드: " + keyword);
      log.debug("지역: " + regionName);
      log.debug("도시: " + cityName);
      log.debug("거래가능만 보기: " + checked);
      if (regionName.equals("지역") || regionName.equals("전체")) {
        return new ResultMap()
            .setStatus(SUCCESS)
            .setData(marketService.list(keyword));
      }

      if (cityName.equals("도시")) {
        return new ResultMap()
            .setStatus(SUCCESS)
            .setData(marketService.listRegion(regionName, keyword));
      }

      return new ResultMap()
          .setStatus(SUCCESS)
          .setData(marketService.listCity(regionName, cityName, keyword));

    } else {
      log.debug("키워드: " + keyword);
      log.debug("지역: " + regionName);
      log.debug("도시: " + cityName);
      log.debug("거래가능만 보기: " + checked);
      if (regionName.equals("지역") || regionName.equals("전체")) {
        return new ResultMap()
            .setStatus(SUCCESS)
            .setData(marketService.listChecked(keyword));
      }

      if (cityName.equals("도시")) {
        return new ResultMap()
            .setStatus(SUCCESS)
            .setData(marketService.listRegionChecked(regionName, keyword));
      }

      return new ResultMap()
          .setStatus(SUCCESS)
          .setData(marketService.listCityChecked(regionName, cityName, keyword));
    }
  }

  @RequestMapping("/market/get")
  public Object get(int no) {
    log.debug(no);
    Market market = marketService.get(no);
    if (market == null) {
      return new ResultMap().setStatus(FAIL).setData("해당 번호의 게시글이 없습니다."); // 컨트롤러는 서비스 객체의 리턴 값에 따라 응답 데이터를 적절히 가공하여 리턴한다.
    }
    return new ResultMap().setStatus(SUCCESS).setData(market);
  }

  @RequestMapping("/market/add")
  public Object add(Market market, MultipartFile[] files, HttpSession session) {
    User user = (User) session.getAttribute("loginUser");
    System.out.println(user);
    market.setWriter(user);
    try {
      Object fileList = saveFile(files);
      return marketService.add(market, fileList);

    } catch (Exception e) {
      StringWriter out = new StringWriter();
      e.printStackTrace(new PrintWriter(out));
      log.error(out.toString());
      return "error!";
    }
  }

  @RequestMapping("/market/update")
  public Object update(Market market, HttpSession session) {
    User user = (User) session.getAttribute("loginUser");
    market.setWriter(user);
    System.out.println(user);
    System.out.println(market);
    int count = marketService.update(market);

    if (count == 1) {
      return new ResultMap().setStatus(SUCCESS);
    } else {
      return new ResultMap().setStatus(FAIL).setData("게시글 번호가 유효하지 않거나 게시글 작성자가 아닙니다.");
    }
  }

  @RequestMapping("/market/updateState")
  public Object updateState(Market market, HttpSession session) {
    User user = (User) session.getAttribute("loginUser");
    market.setWriter(user);
    System.out.println(market);
    int count = marketService.updateState(market);

    if (count == 1) {
      return new ResultMap().setStatus(SUCCESS);
    } else {
      return new ResultMap().setStatus(FAIL).setData("게시글 번호가 유효하지 않거나 게시글 작성자가 아닙니다.");
    }
  }

  @RequestMapping("/market/delete")
  public Object delete(int no, HttpSession session) throws Exception {
    User user = (User) session.getAttribute("loginUser");

    Market market = new Market();
    market.setItemId(no).setWriter(user);
    int count = marketService.delete(market);

    if (count == 1) {
      return new ResultMap().setStatus(SUCCESS);
    } else {
      return new ResultMap().setStatus(FAIL).setData("게시글 번호가 유효하지 않거나 게시글 작성자가 아닙니다.");
    }
  }

  @RequestMapping("/market/like")
  public Object update(ItemLike itemLike, HttpSession session) {
    User user = (User) session.getAttribute("loginUser");
    itemLike.setWriter(user);

    System.out.println(itemLike);

    if (itemLike.isDone()) {
      return marketService.add(itemLike);
    } 
    if (!(itemLike.isDone())) {
      return marketService.delete(itemLike);
    }
    return 1;
  }

  @RequestMapping("/market/getLike")
  public Object getLike(HttpSession session) {
    User user = (User) session.getAttribute("loginUser");

    if (user != null) {
      return new ResultMap()
          .setStatus(SUCCESS)
          .setData(marketService.getLike(user.getUserId()));
    } else {
      return new ResultMap()
          .setStatus(FAIL)
          .setData("로그인 후 이용해주세요.");
    }
  } 

  @RequestMapping("/market/getWish")
  public Object getWish(HttpSession session) {
    User user = (User) session.getAttribute("loginUser");

    if (user != null) {
      return new ResultMap()
          .setStatus(SUCCESS)
          .setData(marketService.getWish(user.getUserId()));
    } else {
      return new ResultMap()
          .setStatus(FAIL)
          .setData("로그인 후 이용해주세요.");
    }
  }

  @RequestMapping("/market/getReply")
  public Object getReply(int no) {
    List<ItemReply> itemReply = marketService.getReply(no);
    if (itemReply == null) {
      return new ResultMap().setStatus(FAIL).setData("해당 번호의 게시글이 없습니다."); // 컨트롤러는 서비스 객체의 리턴 값에 따라 응답 데이터를 적절히 가공하여 리턴한다.
    }
    return new ResultMap().setStatus(SUCCESS).setData(itemReply);
  }

  @RequestMapping("/market/addReply")
  public Object addReply(ItemReply itemReply, HttpSession session) {
    User user = (User) session.getAttribute("loginUser");
    System.out.println(user);
    System.out.println(itemReply);

    itemReply.setWriter(user);
    int count = marketService.addReply(itemReply);

    if (count == 1) {
      return new ResultMap().setStatus(SUCCESS);
    } else {
      return new ResultMap().setStatus(FAIL).setData("게시글 번호가 유효하지 않거나 게시글 작성자가 아닙니다.");
    }
  }

  @RequestMapping("/market/updateReply")
  public Object updateReply(ItemReply itemReply, HttpSession session) {
    User user = (User) session.getAttribute("loginUser");
    itemReply.setWriter(user);
    System.out.println(itemReply);
    int count = marketService.updateReply(itemReply);

    if (count == 1) {
      return new ResultMap().setStatus(SUCCESS);
    } else {
      return new ResultMap().setStatus(FAIL).setData("게시글 번호가 유효하지 않거나 게시글 작성자가 아닙니다.");
    }
  }

  @RequestMapping("/market/deleteReply")
  public Object deleteReply(int no, HttpSession session) throws Exception {
    User user = (User) session.getAttribute("loginUser");

    ItemReply itemReply = new ItemReply();
    itemReply.setReplyId(no).setWriter(user);
    int count = marketService.deleteReply(itemReply);

    if (count == 1) {
      return new ResultMap().setStatus(SUCCESS);
    } else {
      return new ResultMap().setStatus(FAIL).setData("게시글 번호가 유효하지 않거나 게시글 작성자가 아닙니다.");
    }
  }

  @RequestMapping("/market/photo")
  public ResponseEntity<Resource> photo(String filename, String type) {

    try {
      File downloadFile;
      if (type.equals("main")) {
        // 다운로드할 파일의 입력 스트림 자원을 준비한다.
        downloadFile = new File("./upload/item/" + "300x250_" + filename); // 다운로드 상대 경로 준비
      } else {
        // 다운로드할 파일의 입력 스트림 자원을 준비한다.
        downloadFile = new File("./upload/item/"  + filename); // 다운로드 상대 경로 준비
      }
      FileInputStream fileIn = new FileInputStream(downloadFile.getCanonicalPath()); // 다운로드 파일의 실제
      // 경로를 지정하여 입력
      // 스트림 준비
      InputStreamResource resource = new InputStreamResource(fileIn); // 입력 스트림을 입력 자원으로 포장

      // HTTP 응답 헤더를 준비한다.
      HttpHeaders header = new HttpHeaders();
      header.add("Cache-Control", "no-cache, no-store, must-revalidate");
      header.add("Pragma", "no-cache");
      header.add("Expires", "0");

      // 다운로드 파일명을 지정하고 싶다면 다음의 응답 헤더를 추가하라!
      // => 다운로드 파일을 지정하지 않으면 요청 URL이 파일명으로 사용된다.
      header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);



      // // HTTP 응답 생성기를 사용하여 다운로드 파일의 응답 데이터를 준비한다.
      // BodyBuilder http응답생성기 = ResponseEntity.ok(); // 요청 처리에 성공했다는 응답 생성기를 준비한다.
      // http응답생성기.headers(header); // HTTP 응답 헤더를 설정한다.
      // http응답생성기.contentLength(downloadFile.length()); // 응답 콘텐트의 파일 크기를 설정한다.
      // http응답생성기.contentType(MediaType.APPLICATION_OCTET_STREAM); // 응답 데이터의 MIME 타입을 설정한다.
      //
      // // 응답 데이터를 포장한다.
      // ResponseEntity<Resource> 응답데이터 = http응답생성기.body(resource);
      //
      // return 응답데이터; // 포장한 응답 데이터를 클라이언트로 리턴한다.

      return ResponseEntity.ok() // HTTP 응답 프로토콜에 따라 응답을 수행할 생성기를 준비한다.
          .headers(header) // 응답 헤더를 설정한다.
          .contentLength(downloadFile.length()) // 응답할 파일의 크기를 설정한다.
          .contentType(MediaType.APPLICATION_OCTET_STREAM) // 응답 콘텐트의 MIME 타입을 설정한다.
          .body(resource); // 응답 콘텐트를 생성한 후 리턴한다.

    } catch (Exception e) {
      System.out.println("요청한 파일이 없습니다!");
      return null;
    }
  }


  @SuppressWarnings({"unchecked", "rawtypes"})
  private Object saveFile(MultipartFile[] files) throws Exception {
    if (files != null && files.length > 0) {
      ArrayList fileNames = new ArrayList();

      for (MultipartFile file : files) {
        // 파일을 저장할 때 사용할 파일명을 준비한다.
        String filename = UUID.randomUUID().toString();

        // 파일명의 확장자를 알아낸다.
        int dotIndex = file.getOriginalFilename().lastIndexOf(".");
        String fileFormat = file.getOriginalFilename().substring(dotIndex + 1);
        if (dotIndex != -1) {
          filename += file.getOriginalFilename().substring(dotIndex);
        }

        // 파일을 지정된 폴더에 저장한다.
        File photoFile = new File("./upload/item/" + filename); // App 클래스를 실행하는 프로젝트 폴더
        file.transferTo(photoFile.getCanonicalFile()); // 프로젝트 폴더의 전체 경로를 전달한다.

        // 썸네일 이미지 파일 생성
        Thumbnails.of(photoFile).size(300, 250).crop(Positions.CENTER).outputFormat(fileFormat)
        .toFile(new File("./upload/item/" + "300x250_" + filename));

        System.out.println("filename>>" + filename);
        fileNames.add(filename);
      }

      return fileNames;
    } else {
      return null;
    }
  }






}




