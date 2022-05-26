# 🍻 라임

전국 주류 및 주점 검색부터 술모임까지 한 번에!  
애주가들을 위한 상세한 주류 정보 및 판매 주점 정보 제공서비스,
술모임서비스, 채팅서비스등을 제공하는 웹페이지 입니다.

## 바로가기

- 📗 [개요](#-overview)

- 💻 [주요기능 및 화면](#-view)

- 🌈 [노션 링크](https://deadpan-fireplace-ddb.notion.site/Debugger-5574baffadcb4b0ba47de81f5470267a)

## 📗 OverView

- 개발 기간 : 2개월
  - 분석 및 설계 : 2022/02/23 ~ 2022/03/20
  - 구현 : 2022/03/21 ~ 2022/05/01
- 총 개발 인원 : 6명
- 개발 스택
  - Laguage : Java
  - Back-end : Spring Boot / MyBatis / Apache Tomcat
  - Front-end : HTML / BootStrap / CSS / JavaScript / jQuery / Ajax
  - Database : MariaDB / MongoDB
  - Build tool : Gradle
  - VCS tool : GitHub
  - IDE : Eclipse
  - Editor : Atom / VS Code
  - etc. tool : DBeaver / eXERD / Figma
  - Open API : Kakao / Summernote

## 💻 View

### 소셜매치(메인)

- 주요 기능인 주종, 주점, 커뮤니티, 우리지금만나로 이동할 수 있습니다.  
  <img src="/app/소셜매치.jpg" width="55%" height="55%">

### 코트예약

- 등록된 주류를 전체 및 카테고리별로 분류하여 페이징처리 후 주류 리스트 페이지에 출력합니다.
  <img src="/app/코트예약.jpg" width="80%" height="80%">

### 캐시충전

- 제조사, 소재지, 용량 등 등록된 주류의 상세정보와 그 주류를 판매하는 주점의 리스트가 나오고 그 주점의 위치 정보를 지도를 통해 확인할 수 있습니다.  
  <img src="/app/캐시충전.jpg" width="80%" height="80%">  

### 클래스

- 카테고리별로 주점들을 확인할 수 있고 주점의 위치 정보가 지도에 표시되며 사용자와 주점간의 거리를 확인할 수 있습니다.  
  <img src="/app/클래스.jpg" width="80%" height="80%">

### 라임마켓

- 주점리스트에서 주점을 선택하면 상세정보와 그 주점이 판매하는 주류정보, 안주정보, 해당 주점의 리뷰를 확인 할 수 있고 공유하기 버튼으로 카카오톡 공유가 가능합니다.  
  <img src="/app/라임마켓.jpg" width="80%" height="80%">  


### 채팅

- Kakao Maps api를 사용하여 위치를 설정할 수 있습니다.
- 기본인 현위치 혹은 설정한 위치를 기반으로 최신순/거리순으로 우리지금만나 리스트를 확인할 수 있습니다.
<img src="/app/채팅1.jpg" width="80%" height="80%">   
<img src="/app/채팅2.jpg" width="80%" height="80%">



### 관리자페이지

- 우리지금만나 등록
  - 모임 생성 시 장소, 일정, 주종 등 술모임의 기본 정보를 등록할 수 있습니다.  
  - Summernote 에디터를 사용하여 편의성을 향상시켰습니다.

- 우리지금만나 상세
  - 해당 모임의 정보를 확인하여 취향에 맞는 모임의 방장에게 참여요청을 보낼 수 있습니다.
  - Kakao share api를 사용하여 지인과 함께 모임에 참여할 수 있습니다.
  - 유해한 모임 혹은 댓글의 경우 신고할 수 있습니다. 
  - 모임에 댓글을 남길 수 있습니다. 
<img src="/app/관리자1.jpg" width="100%" height="100%">   
<img src="/app/관리자2.jpg" width="70%" height="70%">


