"use strict";

// fetch("/match-rsv/order")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (result) {
//     if (result.status == "fail") {
//       window.alert("서버 요청 오류!");
//       console.log(result.data);
//       return;
//     }
//   });

$.getJSON("/match-rsv/logincheck", (result) => {
  if (result.status == "fail") {
    location.href = `/login/login.html`
  }
  // console.log(result.status);
})

// 1) URL에서 쿼리스트링(query string)을 추출한다.
var arr = location.href.split("?");
console.log(arr);

if (arr.length == 1) {
  alert("요청 형식이 올바르지 않습니다.");
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

const xMatchDate = $("#match-date");
const xMatchTime = $("#match-time");
const xMatchCourt = $("#match-court");
const xBalance = $("#balance");

$.getJSON(`/match/get?matchId=${matchId}`, function (result) {
  console.log(result);
  if (result.status == "fail") {
    window.alert("서버 요청 오류!");
    console.log(result.data);
    return;
  }
  var match = result.data;

  xMatchDate.text(`${getFullYmdStr(match.matchDate)}`);
  xMatchTime.text(
    `${match.startTime.slice(0, 5)}~${match.endTime.slice(0, 5)}`
  );
  xMatchCourt.text(`${match.court.field.name} ${match.court.name}`);

  let date = new Date(`${match.matchDate} ${match.startTime}`);

  console.log(date);

  date.setMinutes(date.getMinutes() - 30);

  console.log(date);

  // countDownTimer("countdown", date);

  if (match.state === "C") {
    $("#apply-btn").addClass("closed-btn").text("마감");
  }
});

function getDay(date) {
  let today = new Date(date);
  const week = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  let day = week[today.getDay()];
  return day;
}

function getFullYmdStr(date) {
  let d = new Date(date);
  return (
    d.getMonth() +
    1 +
    "월 " +
    d.getDate() +
    "일 " +
    "일월화수목금토".charAt(d.getUTCDay()) +
    "요일"
  );
}
