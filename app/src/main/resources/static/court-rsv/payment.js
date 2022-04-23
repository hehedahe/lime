"use strict"

import { getCourt, getLoginUser} from "../common/apiList.js";


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

$('input[aria-label="cash"]').attr('placeholder', `${user.ttlCash} 캐시`);