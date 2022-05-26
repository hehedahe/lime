# 🎾 라임

<img src="/app/소셜매치.jpg" width="55%" height="55%">

현행 시스템을 사용하면서 느낀 불편 사항을 개선하고자 개발한 서비스입니다.
기존 서비스에서는 예약부도(노쇼), 지원자의 객관적 수준 지표가 부족하다고 생각되어,
이러한 부분들을 개선한 테니스 예약 서비스입니다.

## 바로가기

- 📗 [개요](#-overview)

- 💻 [주요기능 및 화면](#-view)

## 📗 OverView

- 개발 기간 : 2개월
  - 분석 및 설계 : 2022/02/23 ~ 2022/03/20
  - 구현 : 2022/03/21 ~ 2022/05/01
- 총 개발 인원 : 5명
- 개발 스택
  - Laguage : Java
  - Back-end : Spring Boot / MyBatis / Apache Tomcat
  - Front-end : HTML / BootStrap / CSS / JavaScript / jQuery / Ajax
  - Database : MariaDB / MongoDB
  - Build tool : Gradle
  - VCS tool : GitHub
  - IDE : Eclipse
  - Editor : Atom / VS Code
  - etc. tool : DBeaver / eXERD
  - Open API : Kakao Map / facebookDevelopers

## 💻 View

### 소셜매치(메인)

- 서비스의 주요 기능으로 다른 회원과 테니스 경기 매칭이 가능합니다.
- 소셜매치 상세
  - 내 선호, 지역, 도시, 레벨, 코트, 성별로 분류 결과를 볼 수 있습니다.
  - 신청가능 버튼 클릭시 결제 페이지로 이동합니다.
  <img src="/app/소셜매치.jpg" width="55%" height="55%">

### 코트예약

- 지인들과 테니스 경기를 즐길 수 있는 테니스장 코트 예약 및 결제 기능입니다.
  - 코트예약 상세
  - Kakao Maps api를 사용하여 위치를 설정할 수 있습니다.
  - 해당 코트를 클릭시 코트예약 상세페이지로 이동합니다.
  <img src="/app/코트예약.jpg" width="80%" height="80%">

### 캐시충전

- INIAPI(KG이니시스)를 사용하여 캐시충전이 가능합니다.
  <img src="/app/캐시충전.jpg" width="80%" height="80%">  

### 클래스

- 회원이 클래스(강의)를 수강신청 할 수 있는 페이지입니다. 
  <img src="/app/클래스.jpg" width="80%" height="80%">
 - 클래스 개설하기를 통해 클래스 등록이 가능합니다.
  <img src="/app/클래스등록1.jpg" width="80%" height="80%">

### 라임마켓

- 회원들이 판매 등록한 중고 테니스 물품을 확인할 수 있습니다.
- 지역/거래가능만 보기/키워드 검색으로 리스트를 분류할 수 있습니다.
- 좋아요 버튼을 통해 등록된 물품을 찜할 수 있습니다.
  <img src="/app/라임마켓.jpg" width="80%" height="80%">
  
- 물품 상세에서는 판매지역, 가격, 판매자 정보, 물품 정보를 확인할 수 있고 댓글을 등록할 수 있습니다.
  <img src="/app/라임마켓물품상세.jpg" width="80%" height="80%">
  
- 모든 회원은 글쓰기 버튼을 통해 물품을 등록할 수 있습니다.
  <img src="/app/라임마켓글쓰기.jpg" width="80%" height="80%">

### 채팅

- MongoDB와 SSE를 사용하여 실시간 채팅이 가능합니다.
<img src="/app/채팅1.jpg" width="80%" height="80%">   
<img src="/app/채팅2.jpg" width="80%" height="80%">



### 관리자페이지

- 관리자로 로그인시 등록된 회원, 클래스, 구장, 라임마켓의 정보를 조회할 수 있습니다. 
<img src="/app/관리자1.jpg" width="80%" height="80%">   
<img src="/app/관리자2.jpg" width="80%" height="80%">


