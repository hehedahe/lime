"use strict"

const countDownTimer = function (id, date) {
    var _vDate = new Date(date);
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
      var now = new Date();
      var distDt = _vDate - now;

      if (distDt < 0) {
        clearInterval(timer);
        document.getElementById(id).textContent = '해당 매치는 마감되었습니다.';
        $("#apply-btn").addClass("closed-btn").text("마감");
        return;
      }

      var days = Math.floor(distDt / _day);
      var hours = Math.floor((distDt % _day) / _hour);
      var minutes = Math.floor((distDt % _hour) / _minute);
      var seconds = Math.floor((distDt % _minute) / _second);

      document.getElementById(id).textContent = days + '일 ';

      if (days == 0) {
        document.getElementById(id).textContent = '';
      }

      if (hours < 10) {
        document.getElementById(id).textContent += '0';
      }
      document.getElementById(id).textContent += hours + ':';
      
      if (minutes < 10) {
        document.getElementById(id).textContent += '0';
      }
      document.getElementById(id).textContent += minutes + ':';
      
      if (seconds < 10) {
        document.getElementById(id).textContent += '0';
      }
      document.getElementById(id).textContent += seconds;

      }

      timer = setInterval(showRemaining, 1000);

}
    
    // 1) URL에서 쿼리스트링(query string)을 추출한다.
    var arr = location.href.split("?");
    console.log(arr);

    if (arr.length == 1) {
      alert("요청 형식이 올바르지 않습니다.")
      throw "URL 형식 오류!";
    }

    var qs = arr[1];
    console.log(qs);

    var params = new URLSearchParams(qs);
    var matchId = params.get("matchId");

    if (matchId == null) {
      alert("매치 번호가 없습니다.");
      throw "파라미터 오류!";
    }
    console.log(matchId);

    const xNumOfPeople = $("#numOfPeople");
    const xMatchType = $("#matchType");
    const xLevel = $("#level")
    const xIndYn = $("#indYn")
    const xCourtType = $("#courtType")
    const xParkingArea = $("#parkingArea")
    const xManagerName = $("#managerName")
    const xMatchDate = $("#match-date")
    const xFieldName = $("#field-name")
    const xCourtNo = $("#court-no")
    const xFieldAddr = $("#field-addr")

    $.getJSON(`/match/get?matchId=${matchId}`, function (result) {
      console.log(result);
      if (result.status == "fail") {
        window.alert("서버 요청 오류!");
        console.log(result.data);
        return;
      }
      var match = result.data;
      
      xNumOfPeople.text(checkNumOfPeople(match.numOfPeople))
      xMatchType.text(checkMatchType(match.matchTypeNo))
      xLevel.text(checkLevel(match.levelNo))
      xManagerName.text(match.managerName)
      xMatchDate.text(`${getFullYmdStr(match.matchDate)} ${match.startTime.slice(0, 5)}`)
      xFieldName.text(match.court.field.name)
      xCourtNo.text(match.court.name)
      xFieldAddr.text(match.court.field.addr)

      let date = new Date(`${match.matchDate} ${match.startTime}`);
      
      console.log(date)

      date.setMinutes(date.getMinutes() - 30)

      console.log(date)

      countDownTimer('countdown', date);

      showFieldMap(match.court.field.lat, match.court.field.lng)

      if (match.state === 'C') {
        $("#apply-btn").addClass("closed-btn").text("마감")
      }

    });

    function getDay(date) {
      let today = new Date(date);
      const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      let day = week[today.getDay()];
      return day;
    }

    function getFullYmdStr(date) {
      let d = new Date(date);
      return d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일 " + '일월화수목금토'.charAt(d.getUTCDay()) + '요일';
    }

    function showFieldMap(lat, lng) {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
          center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 마커가 표시될 위치입니다 
      var markerPosition = new kakao.maps.LatLng(lat, lng);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }

    function checkMatchType(matchTypeNo) {
      switch (matchTypeNo) {
        case 1: return '남성 매치'
        case 2: return '여성 매치'
        case 3: return '혼성 매치'
      }
    }

    function checkNumOfPeople(numOfPeople) {
      switch (numOfPeople) {
        case 'S': return '1 vs 1'
        case 'D': return '2 vs 2'
      }
    }

    function checkLevel(level) {
      switch (level) {
        case 1: return '모든 레벨'
        case 2: return 'BEGINNER'
        case 3: return 'INTERMEDIATE'
        case 4: return 'ADVANCED'
        case 5: return 'PRO'
      }
    }

    function checkCourtType(courtTypeNo) {
      switch (courtTypeNo) {
        case 1: return '하드'
        case 2: return '클레이'
        case 3: return '잔디'
        case 4: return '앙투카'
      }
    }

    var URLSearchParams = new URLSearchParams();
    console.log("URLSearchParams : " + URLSearchParams);

    $(".form-select").on("change", function (e) {

      const name = $(e.target).attr("name")
      console.log(name)
      const value = e.target.value
      console.log(value)

      if (value == 0) {
        URLSearchParams.delete(name)
      } else {
        URLSearchParams.set(name, value)
      }

      let matchDate = $(".active a").attr("date")
      console.log(matchDate)

      URLSearchParams.set("matchDate", matchDate);

      console.log("URLSearchParams : " + URLSearchParams);

      $.getJSON(`http://localhost:8080/match/list?${URLSearchParams}`, function (arr) {
        console.log(arr)
        const matchList = $(".match-list")
        let str = ''
        for (let i = 0; i < arr.length; i++) {
          let state = ''
          let aaa = ''
          if (arr[i].state === 'A') {
            state = '신청 가능'
          } else {
            state = '마감'
            aaa = 'closed-btn'
          }
          str += `
          <a href="/social_match/index.html" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between align-items-center">
              <div>
                <div class="d-flex justify-content-start align-items-center">
                  <div class="me-4 match-time">${arr[i].startTime.slice(0, 5)}</div>
                  <div class="ms-1">
                    <h6 class="mb-1">${arr[i].court.field.name} ${arr[i].court.name}</h6>
                    <p class="text-muted match-info">${checkMatchType(arr[i].matchTypeNo)} · ${checkNumOfPeople(arr[i].numOfPeople)} · ${checkCourtType(arr[i].court.courtTypeNo)} · ${checkLevel(arr[i].levelNo)}</p>
                  </div>
                </div>
              </div>
              <button class="btn match-btn ${aaa}">${state}</button>
              </div>
            </a>`
        }
        $(".match-list").html(str)
      })
    })

    $("#next-btn").on("click", (e) => {
      $(".date-div").css("transform", "translateX(-36%)").css("transition", "all .5s");
      $("#next-btn").addClass("disabled");
      $("#prev-btn").removeClass("disabled");
    })

    $("#prev-btn").on("click", (e) => {
      $(".date-div").css("transform", "translateX(0%)").css("transition", "all .5s");
      $("#prev-btn").addClass("disabled");
      $("#next-btn").removeClass("disabled");
    })

    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: '#navbar-example'
    })

    $("#apply-btn").on("click", (e) => {
      $.getJSON("/member/getLoginUser", (result) => {
        console.log(result.status);
        if (result.status == "fail") {
          location.href = `/login/login.html`
        }
        // console.log(result.status);
      })

      $(location).attr("href", `/social-match/payment.html?matchId=${matchId}`)

    //   $.getJSON("/rsv/match/balance", function (result) {
    //     console.log(result);
    //     let userInfo = result.data;
    //     if (userInfo.sum < 20000) {
    //       window.alert("라임캐시가 부족합니다. 충전하시겠습니까?");
    //       location.href = `../common/charge.html`
    //     } else {
    //       $(location).attr("href", `/social-match/payment.html?matchId=${matchId}`)
    //     }
    //   })      
    }
      // location.href = `/social-match/payment.html?matchId=${matchId}`
      // fetch("/match/order").then(function (response) {
      //   $(location).attr("href", `/social-match/payment.html?matchId=${matchId}`)
      // })
    )