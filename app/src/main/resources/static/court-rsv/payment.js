"use strict"

import {getCourt, getLoginUser} from "../common/apiList.js";



// =====================================
//              url qs → obj
// =====================================

var urlArr = location.href.split('?');

if(urlArr.length == 0) {
    alert('요청 형식이 옳바르지 않습니다.');
    throw 'URL 형식 오류!';
}

function paramsToObj(entries) {
    const result = {};

    for (const [key, value] of entries) {
        result[key] = value;
    }

    return result;
}

const entries = new URLSearchParams(location.search).entries();
const rsvInfo = paramsToObj(entries);
console.log("예약할 정보", rsvInfo);




// =====================================
//            예약 정보 가져오기
// =====================================
let month = parseInt(rsvInfo.date.slice(2,-2));
let date = parseInt(rsvInfo.date.slice(-2));
let day = rsvInfo.day;
let time = parseInt(rsvInfo.time);

const res = await getCourt(rsvInfo.fieldId);
let field = res.data;
console.log("res:::::::::::::::::", field);

$('#rsv-info').html(
    `<span>${month}월 ${date}일 ${day}요일</span>
     <span>${time}:00 ~ ${time + 2}:00</span>
     <span>${field.name} 코트${rsvInfo.courtId}</span>`
)




// =====================================
//            로그인한 유저 정보
// =====================================
const response = await getLoginUser();
console.log("user:::::::::::::::::::::", response);
let user = response.data;

function cashToRE(cash) {
    return cash.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

let cash = cashToRE(user.ttlCash);

$('input[aria-label="cash"]').attr('placeholder', `${cash} 캐시`);

let rsvData = {
    userId : user.no,
    amt : 50000,
    typeUse : "U",
    courtRsv : {
        fieldId : rsvInfo.fieldId,
        courtId : rsvInfo.courtId,
        dateTime : rsvInfo.date + rsvInfo.time
    }
};




// =====================================
//          캐시 잔액 확인 후 결제
// =====================================
$('#payment-btn').on('click', function (e) {
    if (user.ttlCash <= 50000) {
        alert("라임 캐시 충전이 필요합니다. 🪙");
    } else {
        fetch(('/rsv/court/add'), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(rsvData)
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            if (result.status == 'success') {
                alert('코트 예약이 성공적으로 완료되었습니다.');
                location.href = '/social-match/rsv.html';
            } else {
                alert('예약 실패!')
            }
        })
    }
})



