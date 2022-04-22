"use strict";

$(".nav-tabs").on("click", (e) => {
    // console.log(e.target.getAttribute("date"))
    $(".nav-link.active").removeClass("active");
    $(e.target).addClass("active");
    // $(e.target).closest("li").addClass("active");
    // let matchDate = e.target.getAttribute("date")
    // let matchDate = $(e.target).closest("a").attr("date");
    // makeMatchList(
    //   `http://localhost:8080/match/list?matchDate=${matchDate}`
    // );
});

// var userId;

// $.getJSON("/member/getLoginUser", function (result) {
//   userId = result.data.no;
//   console.log('userId = ' + userId);
// })

$.getJSON("/member/getLoginUser", (result) => {
  console.log(result.status);
  if (result.status == "fail") {
    location.href = `/login/login.html`
  }
  // console.log(result.status);
})

$.getJSON("/rsv/match/get", function (result) {
  let arr = result.data
  let matchId;
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].matchId)
    matchId = arr[i].matchId;
    $.getJSON(`/match/get?matchId=${matchId}`, function (result) {
      var match = result.data;
      str += `
      <li class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <div>
          <div class="d-flex justify-content-start align-items-center">
            <div class="ms-5">
              <p id="match-date" class="mb-1">${getFullYmdStr(match.matchDate)} ${match.startTime.slice(0, 5)}</p>
              <h6 id="field-court-name" class="mb-1">${match.court.field.name} ${match.court.name}</h6>
              <p id="field-addr" class="mb-1">${match.court.field.addr}</p>
              <p id="match-detail" class="text-muted match-info">
              ${checkMatchType(match.matchTypeNo)} · ${checkNumOfPeople(match.numOfPeople)} · ${checkCourtType(match.court.courtTypeNo)} · ${checkLevel(match.levelNo)}</p>
            </div>
          </div>
        </div>
        <div id="pay-date" class="text-center align-items-center text-muted">
          <p id="">결제일시 ${(arr[i].date).replace(/-/g, '.')}</p>
          <p id="">${checkRsvState(arr[i].state)}</p>
        </div>
      </div>
      </li>
      `;
      // console.log('str = ' + str)
      $(".match-rsv-list").html(str);
    })
  }
  // console.log('str = ' + str)
  // $(".match-rsv-list").html(str);
})

function makeMatchRsvList(url) {
  $.getJSON(url, function (arr) {
    console.log(arr);
    let str = "";
    if (arr.length == 0) {
      str += `<div class="list-group-item d-flex w-100 justify-content-center align-items-center p-5">예약 내역이 존재하지 않습니다.</div>`;
      $(".match-list").html(str);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      str += `
      <li class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <div>
          <div class="d-flex justify-content-start align-items-center">
            <div class="ms-5">
              <p id="match-date" class="mb-1">${getFullYmdStr(match.matchDate)} ${match.startTime.slice(0, 5)}</p>
              <h6 id="field-court-name" class="mb-1">${arr[i].court.field.name} ${arr[i].court.name}</h6>
              <p id="field-addr" class="mb-1">대구 수성구 알파시티2로 95 5층</p>
              <p id="match-detail" class="text-muted match-info">여자 · 1vs1 · 하드 · 모든 레벨</p>
            </div>
          </div>
        </div>
        <div id="pay-date" class="text-center align-items-center text-muted">
          <p id="">결제일시 2022.02.25 15:32</p>
          <p id="">결제 완료</p>
        </div>
      </div>
      </li>
      `;
    }
    $(".match-rsv-list").html(str);
  });
}

function getFullYmdStr(date) {
  let d = new Date(date);
  return d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일 " + '일월화수목금토'.charAt(d.getUTCDay()) + '요일';
}

function checkMatchType(matchTypeNo) {
  switch (matchTypeNo) {
      case 1:
          return "남자";
      case 2:
          return "여자";
      case 3:
          return "혼성";
  }
}

function checkNumOfPeople(numOfPeople) {
  switch (numOfPeople) {
      case "S":
          return "1vs1";
      case "D":
          return "2vs2";
  }
}

function checkLevel(level) {
  switch (level) {
      case 1:
          return "모든 레벨";
      case 2:
          return "BEGINNER";
      case 3:
          return "INTERMEDIATE";
      case 4:
          return "ADVANCED";
      case 5:
          return "PRO";
  }
}

function checkCourtType(courtTypeNo) {
  switch (courtTypeNo) {
      case 1:
          return "하드";
      case 2:
          return "클레이";
      case 3:
          return "잔디";
      case 4:
          return "앙투카";
  }
}

function checkRsvState(state) {
  switch (state) {
      case "P":
          return "결제 완료";
      case "U":
          return "이용 완료";
      case "C":
          return "취소 완료";
  }
}