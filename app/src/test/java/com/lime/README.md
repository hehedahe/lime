<<<<<<< HEAD
# src/test/java
=======
# 11.1 DB 프로그래밍을 더 쉽고 간단히 하는 방법 : Mybatis 퍼시스턴스 프레임워크 도입

- JDBC 코드를 캡슐화한 Mybatis 퍼시스턴스 프레임워크 사용하기

## 백엔드 개발 실습

### 1단계 - 프로젝트에 MyBatis 라이브러리를 추가한다.

- build.gradle   
  - `search.maven.org` 사이트에서 *mybatis* 라이브러리 정보를 찾는다.
    - 직접 구성
      - `implementation 'org.mybatis:mybatis:3.5.9'`
      - `implementation 'org.mybatis:mybatis-spring:2.0.7'`
    - Spring Boot 구성
      - `implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:2.2.2'`
  - 의존 라이브러리 블록에서 `mybatis` 라이브러리를 등록한다.
- gradle을 이용하여 eclipse 설정 파일을 갱신한다.
  - `$ gradle eclipse`
- 이클립스에서 프로젝트를 갱신한다.

### 2단계 - DAO 구현체에 Mybatis 프레임워크를 적용한다.

- com.eomcs.mylist.dao.mariadb.BoarDaoImpl 클래스 변경
  - SQL 코드를 뜯어내어 XML 파일로 옮긴다.
    - /src/main/resources/com/eomcs/mylist/dao/BoardDao.xml
- com.eomcs.mylist.App 클래스 변경
  - SqlSessionFactory 객체 준비

### 3단계 - DAO 구현체를 자동으로 생성한다.

- com.eomcs.mylist.dao.mariadb.BoardDaoImpl 클래스 삭제
- com.eomcs.mylist.dao.BoardDao 인터페이스 변경
  - 애노테이션을 이용하여 Mybatis 관련 설정하기
- com.eomcs.mylist.App 클래스 변경
  - SqlSessionFactory 객체를 준비하는 메서드 제거

### 4단계 - 레코드 값을 저장할 도메인 클래스의 별명을 설정한다.

- src/main/resources/application.properties 파일 변경
  - mybatis의 도메인 클래스의 별명 설정 추가
- com/eomcs/mylist/dao/BoardDao.xml 파일 변경
  - 도메인 클래스를 직접 사용하는 대신에 별명을 사용한다.
  - <resultMap></resultMap> 태그를 이용하여 컬럼과 필드를 연결한다.


### 5단계 - 자바 소스 파일과 설정 파일을 분리한다.

- BoardDao.xml 파일을 src/main/resources 폴더로 옮긴다.


### 6단계 - BoardDao에 Mybatis를 적용한다.

- Book 데이터를 저장할 테이블을 생성한다.
```
create table ml_book(
  book_no int not null,
  title varchar(255) not null,
  author varchar(100) not null,
  press varchar(100) not null,
  feed text not null,
  read_date date,
  page int,
  price int
);

alter table ml_book
  add constraint primary key (book_no),
  modify column book_no int not null auto_increment;
```

- com.eomcs.mylist.domain.Book 클래스 변경
  - primary key 값을 저장할 no 필드를 추가한다.

- com.eomcs.mylist.dao.BookDao 인터페이스 변경
  - 메서드의 파라미터 및 리턴 타입 변경
  - Mybatis 설정 추가

- com.eomcs.mylist.controller.BookController 클래스 변경
  - 메서드 파라미터 및 DAO 호출 코드 변경


### 7단계 - ContactDao에 Mybatis를 적용한다.

- Contact 데이터를 저장할 테이블을 생성한다.
```
create table ml_contact(
  contact_no int not null,
  name varchar(50) not null,
  tel varchar(50) not null,
  email varchar(20) not null,
  company varchar(50)
);

alter table ml_contact
  add constraint primary key (contact_no),
  modify column contact_no int not null auto_increment;
```

- com.eomcs.mylist.domain.Contact 클래스 변경
  - primary key 값을 저장할 no 필드를 추가한다.

- com.eomcs.mylist.dao.ContactDao 인터페이스 변경
  - 메서드의 파라미터 및 리턴 타입 변경
  - Mybatis 설정 추가

- com.eomcs.mylist.controller.ContactController 클래스 변경
  - 메서드 파라미터 및 DAO 호출 코드 변경


### 8단계 - TodoDao에 Mybatis를 적용한다.

- Todo 데이터를 저장할 테이블을 생성한다.
```
create table ml_todo(
  todo_no int not null,
  title varchar(255) not null,
  done boolean default false
);

alter table ml_todo
  add constraint primary key (todo_no),
  modify column todo_no int not null auto_increment;
```

- com.eomcs.mylist.domain.Todo 클래스 변경
  - primary key 값을 저장할 no 필드를 추가한다.

- com.eomcs.mylist.dao.TodoDao 인터페이스 변경
  - 메서드의 파라미터 및 리턴 타입 변경
  - Mybatis 설정 추가

- com.eomcs.mylist.controller.TodoController 클래스 변경
  - 메서드 파라미터 및 DAO 호출 코드 변경

## 프론트엔드 개발 실습

- 독서록 관련 UI 변경
  - index.html, view.html
- 연락처 관련 UI 변경
  - index.html, view.html
- To-do 관련 UI 변경
  - index.html







#
>>>>>>> 5f2b99c5f93f9a498883ae7b105161b2835339a6
