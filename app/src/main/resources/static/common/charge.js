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
})

// 1) URL에서 쿼리스트링(query string)을 추출한다.
// var arr = location.href.split("?");
// console.log(arr);
//
// // if (arr.length == 1) {
// //   alert("요청 형식이 올바르지 않습니다.");
// //   throw "URL 형식 오류!";
// // }
//
// var qs = arr[1];
// console.log(qs);
//
// var params = new URLSearchParams(qs);
// var matchId = params.get("matchId");
//
// if (matchId == null) {
//   alert("매치 번호가 없습니다.");
//   throw "파라미터 오류!";
// }
// console.log(matchId);


$.getJSON("/member/getLoginUser", function (result) {
    console.log(result);
    $("#balance").text(`보유 캐시 ${(result.data.ttlCash).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`)
})

var amount = $('input:radio[name="chargeAmount"]:checked').next().text()
console.log(amount);

const xAmount = $("#amount");
xAmount.text(`${amount}`);

$(".form-check-input").on("click", function (e) {
    var v = $('input:radio[name="chargeAmount"]:checked').next().text()
    console.log(v);
    xAmount.text(`${v}`);
})

var payMethod = $('input:radio[name="paymentMethod"]:checked').next().text()
console.log(payMethod)

var v;

$(".form-check-input").on("click", function (e) {
    v = $('input:radio[name="paymentMethod"]:checked').next().text()
    console.log(v);
})

console.log(v);

$(".modal-footer button").on("click", function () {
    $.getJSON(`/rsv/match/add?amt=20000&typeUse=U&matchId=${matchId}&state=P`, function (result) {
        console.log('소셜매치 결제 : ' + result.status)
    })
    location.href = `/social-match/rsv.html`
})


// =====================================
//            이니시스 API
// =====================================





$("#charge-btn").click(function (e) {
    console.log('클릭');
    

    let a1 = $('#agreement1').is(':checked')
    console.log(a1)
    let a2 = $('#agreement2').is(':checked')
    console.log(a2)

    if (($('#agreement1').is(':checked')) && ($('#agreement2').is(':checked')) && v == '카드 결제') {
        window.resizeTo(1000,820);

        //결제시 전달되는 정보
        var IMP = window.IMP; // 생략 가능
        IMP.init("imp96641277"); // 예: imp00000000

        // IMP.request_pay(param, callback) 결제창 호출
        IMP.request_pay({
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: '라임캐시 충전'/*상품명*/,
            amount: 100/*상품 가격*/,
            buyer_email: 'iamport@siot.do'/*구매자 이메일*/,
            buyer_name: '구매자이름',
            buyer_tel: '010-1234-5678'/*구매자 연락처*/,
            buyer_addr: '서울특별시 강남구 삼성동'/*구매자 주소*/,
            buyer_postcode: '123-456'/*구매자 우편번호*/
        }, rsp => {
            var result = '';
            if (rsp.success) {
                // axios로 HTTP 요청
                axios({
                    url: "{서버의 결제 정보를 받는 endpoint}", // 예: https://www.myservice.com/payments/complete
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    data: {
                        imp_uid: rsp.imp_uid,
                        merchant_uid: rsp.merchant_uid
                    }
                }).then((data) => {
                    // 서버 결제 API 성공시 로직
                })
            } else {
                alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
            }
            if (result == '0') {
                location.href = $.getContextPath() + "/Cart/Success";
            }
            alert(msg);
        });
    } else {
        window.alert("구매 조건 및 정보 제공 등에 동의해 주세요.");
    }


});