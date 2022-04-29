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
var user;
$.getJSON("/member/getLoginUser", (result) => {
    user = result.data
    console.log(result.data);
    if (result.status == "fail") {
        location.href = `/login/login.html`
    } else {
        $("#balance").text(
            `보유 캐시 ${(result.data.ttlCash).toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`);
    }
});

console.log("user::::::::::::::", user)

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


// 결제 금액
var amount = $('input:radio[name="chargeAmount"]:checked').next().text()
console.log("결제 예정 금액::::::::::", amount.replace(',', '').replace('원',''));
const xAmount = $("#amount");
xAmount.text(`${amount}`);

$(".form-check-input").on("click", function (e) {
    amount = $('input:radio[name="chargeAmount"]:checked').next().text()
    console.log(amount);
    xAmount.text(`${amount}`);
})


// 결제 수단
var payMethod = $('input:radio[name="paymentMethod"]:checked').next().text()
console.log(payMethod)
var methodValue = $('input:radio[name="paymentMethod"]:checked').next().text();

$(".form-check-input").on("click", function (e) {
    methodValue = $('input:radio[name="paymentMethod"]:checked').next().text()
    console.log(methodValue);
})



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
    console.log(methodValue);

    let a1 = $('#agreement1').is(':checked')
    console.log(a1)
    let a2 = $('#agreement2').is(':checked')
    console.log(a2)

    if (($('#agreement1').is(':checked'))
        && ($('#agreement2').is(':checked'))
        && methodValue == '카드 결제') {

        window.resizeTo(1200, 890);

        //결제시 전달되는 정보
        var IMP = window.IMP; // 생략 가능
        IMP.init("imp96641277"); // 예: imp00000000

        // IMP.request_pay(param, callback) 결제창 호출
        IMP.request_pay({ // param
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: '라임캐시 충전'/*상품명*/,
            amount: 100/*상품 가격*/,
            buyer_email: user.email/*구매자 이메일*/,
            buyer_name: user.name,
            buyer_tel: phNoFormat(user.phoneNo)/*구매자 연락처*/
        }, function (rsp) { // callback
            if (rsp.success) { // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
                // axios로 HTTP 요청
                axios.post('/limecash/charge', {
                    impUid: rsp.imp_uid,
                    merchantUid: rsp.merchant_uid,
                    userId: user.userId,
                    amt: amount.replace(',', '').replace('원', '')
                }).then((data) => {
                    console.log(data.status);
                });

                window.opener.location.reload();
                window.close();
            } else {
                alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
            }
        });
    // } else if (($('#agreement1').is(':checked'))
    //         && ($('#agreement2').is(':checked'))
    //         && methodValue == '무통장 입금'){
    //
    //     axios.post('/limecash/charge',{
    //         userId: user.userId,
    //         amt: amount.replace(',', '').replace('원','')
    //     }).then((data) => {
    //         console.log(data.status);
    //     });
    //
    //     window.opener.location.reload();
    //     window.close();
    } else {
        window.alert("구매 조건 및 정보 제공 등에 동의해 주세요.");
    }


});



function phNoFormat(phNo) {
    return phNo.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
}