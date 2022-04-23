"use strict"

import {getCourt, bookCourt} from "../common/apiList.js";



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
// 코트 사진 / 지도
// =====================================

// 지도
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.499, 127.029), //지도의 중심좌표.
    level: 6 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
    new kakao.maps.Size(44, 49), // 마커이미지의 크기입니다
    {offset: new kakao.maps.Point(27, 69)}); // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// swiper slide
var swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
});

// 지도 보기
$('#map-photo').on('click', function(e) {
    if ($('#map').hasClass('isShow')) {
        $('#map').removeClass('isShow');
    } else {
        $("#map").addClass('isShow');
    }
});





// =====================================
//        예약하려는 코트 정보 뿌리기
// =====================================
(async function() {
    const res = await getCourt(rsvInfo.fieldId);
    console.log("코트 정보 :::::::", res.data);

    let court = res.data;

    $('#crt-name').text(court.name).attr('data-court-id', court.fieldId);
    $('#crt-addr').text(court.addr)
    $('#crt-contact').text(court.number);

})();

$('#book-btn').on('click', function (e) {
    fetch('/member/getLoginUser')
        .then(function (res) {
            return res.json();
        })
        .then(function (r) {
            console.log(r)
            if (r.status == "fail") {
                alert('로그인이 필요한 페이지입니다.');
            }
        });

})





