"use strict"

import {checkCourtType, checkIndoor, checkParking, checkLight} from "../common/typeCheck.js"
import { getCourt } from "../common/apiList.js";



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
//            코트 사진 / 지도
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

// 중심좌표 부드럽게 이동하기
function panTo(lat, lng) {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(lat, lng);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
};

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

    $('#c-indoor').text(checkIndoor(court.indYn));
    $('#c-type').text(checkCourtType(court.courtTypeId));
    $('#c-light').text(checkLight(court.lightYn));
    $('#c-parking').text(checkParking(court.parkingArea))

    panTo(court.lat, court.lng);

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(court.lat, court.lng);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
        clickable: true  // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
})();



// =====================================
//    예약 버튼 클릭 시 로그인 유무 확인
// =====================================
$('#book-btn').on('click', function (e) {
    fetch('/member/getLoginUser')
        .then(function (res) {
            return res.json();
        })
        .then(function (r) {
            console.log(r)
            if (r.status == "fail") {
                alert('로그인이 필요한 페이지입니다.');
            } else {
                location.href = `/court-rsv/payment.html?${urlArr[1]}`;
            }
    });

})





