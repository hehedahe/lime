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
    userId : user.userId,
    amt : 50000,
    typeUse : "U",
    used : "C",
    courtRsv : {
        fieldId : rsvInfo.fieldId,
        courtId : rsvInfo.courtId,
        dateTime : rsvInfo.date + rsvInfo.time
    }
};




// =====================================
//          캐시 잔액 확인 후 결제
// =====================================

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


$('#payment-btn').on('click', function (e) {
    if (user.ttlCash < 50000) {
        Swal.fire({
            icon: 'info',
            title: '라임 캐시 잔액이 부족합니다.',
            text: '캐시 충전 후 다시 시도해 주세요 🪙',
            showCancelButton: true,
            confirmButtonColor: '#66c88d',
            cancelButtonColor: '#d33',
            confirmButtonText: '충전하기',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                window.open('/common/charge.html',
                          '라임캐시 충전',
                         'width=500, height=820, left=-1500, top=100, resizable=false');
            }
        });
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
                Toast.fire({
                    icon: 'success',
                    title: '코트 예약이 완료되었습니다.'
                });

                sessionStorage.clear();

                setTimeout(function () {
                    location.href = '/social-match/rsv.html';
                }, 1200)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: '코트 예약에 실패했습니다.',
                    text: '다시 시도해 주세요.'
                });
            }
        });
    }
});




// =====================================
//            라임 캐시 충전
// =====================================
$('#addon-btn').on('click', function (e) {
    window.open('/common/charge.html', '라임캐시 충전', 'width=500, height=870, left=-1500, top=50, resizable=false, scrollbars=false');
});

