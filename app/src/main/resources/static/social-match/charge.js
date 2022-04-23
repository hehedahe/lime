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

$.getJSON("/member/getLoginUser", (result) => {
  console.log(result.status);
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

const xBalance = $("#balance");
const xAmount = $("#amount");

$.getJSON("/rsv/match/balance", function (result) {
  console.log(result);
  let userInfo = result.data;
  xBalance.text(`보유 캐시 ${(userInfo.sum).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`)
})

var amount = $('input:radio[name="chargeAmount"]:checked').next().text()

console.log(amount)

$(".form-check-input").on("click", function (e) {
    var v = $('input:radio[name="chargeAmount"]:checked').next().text()
    console.log(v);
})

var payMethod = $('input:radio[name="paymentMethod"]:checked').next().text()

console.log(payMethod)

$(".form-check-input").on("click", function (e) {
    var v = $('input:radio[name="paymentMethod"]:checked').next().text()
    console.log(v);
})

$("#charge-btn").on("click", function (e) {
    if (!($('#agreement1').is(':checked')) && ($('#agreement2').is(':checked'))) {
        window.alert("구매 조건 및 정보 제공 등에 동의해 주세요.");
        return;
    }
})


$(".modal-footer button").on("click", function () {
  $.getJSON(`/rsv/match/add?amt=20000&typeUse=U&matchId=${matchId}&state=P`, function (result) {
    console.log('소셜매치 결제 : ' + result.status)
  })
  location.href = `/social-match/rsv.html`
})
