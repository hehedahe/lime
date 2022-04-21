"use strict"

import {selectCity} from '../common/selectCity.js'
import {fieldList, getCourt, courtList, findRegion, findCity, rsvsByDate} from '../common/apiList.js'





// =================
// 카카오 지도 API
// =================
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

// 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
map.setZoomable(false);

// 중심좌표 부드럽게 이동하기
function panTo(lat, lng) {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(lat, lng);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
};





// =================
// 전체 코트 마커 뿌리기
// =================
var marker, markerPosition;

(async function () {
    var response = await fieldList();

    response?.map((court) => {
        // 마커가 표시될 위치입니다
        markerPosition = new kakao.maps.LatLng(court.lat, court.lng);

        // 마커를 생성합니다
        marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // 마커이미지 설정
            clickable: true  // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    })
})();





// =================
// 시도/시군구 sorting & 중심좌표 뿌리기
// =================
const dropRegion = $('#drop-region');
const dropCity = $('#drop-city');

// 시도
dropRegion.on('change', async function (e) {
    e.preventDefault();
    e.stopPropagation();

    // 코트 카드 리셋
    let card = $('#crt-card');
    if ($('#crt-card div') != null) {
        card.empty();
    };

    selectCity(dropRegion.val());

    const coordinateRegion = await findRegion(Number($('#drop-region option:selected').val()));

    let regionLat = coordinateRegion.region?.regionLat;
    let regionLng = coordinateRegion.region?.regionLng;

    panTo(regionLat, regionLng);

    const crtByRegion = await courtList(regionLat, regionLng);

    crtByRegion?.map((fields) => {
        card.append(
            `<div class="card-cover swiper-slide">
                <button class="card-btn card border-0" >
                    <div class="card-body">
                        <h5 class="card-title" style="height: 48px" data-value="${fields.fieldId}">${fields.name}</h5>
                        <p class="card-text">#${checkCourtType(fields.courtTypeId)}</p>
                        <div class="content3">
                            <p class="card-text">${fields.distance} km</p>
                            <a href="view.html?" class="btn btn-sm info-btn">정보</a>
                        </div>
                    </div>
                </button>
            </div>`
        );
    });
});

// 시군구
dropCity.on('change', async function (e) {
    e.preventDefault();
    e.stopPropagation();

    // 코트 카드 리셋
    let card = $('#crt-card');
    if ($('#crt-card div') != null) {
        card.empty();
    };

    let city = $('#drop-city option:checked').text();
    let regionNo = $('#drop-region option:selected').val();

    const coordiCity = await findCity(city, regionNo);

    let cityLat = coordiCity.cityLat;
    let cityLng = coordiCity.cityLng;

    panTo(cityLat, cityLng);

    const crtByCity = await courtList(cityLat, cityLng);

    crtByCity?.map((fields) => {
        card.append(
            `<div class="card-cover swiper-slide">
                <button class="card-btn card border-0">
                    <div class="card-body">
                        <h5 class="card-title" style="height: 48px" data-value="${fields.fieldId}">${fields.name}</h5>
                        <p class="card-text">#${checkCourtType(fields.courtTypeId)}</p>
                        <div class="content3">
                            <p class="card-text">${fields.distance} km</p>
                            <a href="view.html?" class="btn btn-sm info-btn">정보</a>
                        </div>
                    </div>
                </button>
            </div>`);
    });
});





// =================
// 카드 클릭 시 효과
// =================
$(document).on('click', '.card-btn', async function(e) {
    // 카드 css 효과 유지
    $('.card').removeClass('selected-card');
    $(this).addClass('selected-card');
    $('.info-btn').removeClass('changed-color');
    $(this).find('.info-btn').addClass('changed-color');

    // scroll 이동
    var offset = $('#swiper-temp2').offset();
    $('html').animate({scrollTop: offset.top}, 400);
    // window.scrollTo({ left: 0, top: 750, behavior: "smooth" });
    
    // 선택된 카드(테니스장) field_id 값 찾기
    let fieldId = e.target.getAttribute('data-value');

    // 선택된 카드 정보 한개 가져오기
    let response = await getCourt(fieldId);
    let court = response.data[0];

    // 카드 상세정보 뿌려주기
    $('#crt-name').text(court.name).attr('data-court-id', court.fieldId);
    $('#crt-addr').text(court.addr);
    $('#crt-indYn').text(checkIndoor(court.indYn) + '  ·');
    $('#crt-type').text(checkCourtType(court.courtTypeId) + '  ·');
    $('#crt-parking').text(checkParking(court.parkingArea));
});

// 해당 날짜 예약 리스트 가져오기
$(document).on('click', '.date-wrap', async function (e) {
    let selectedDate = e.target.getAttribute('data-date');
    let selectedField = $('#crt-name').attr('data-court-id');

    const res = await rsvsByDate(selectedDate, selectedField);

    console.log(res);
    res.data?.map((rsv) => {

        let time = ("0" + rsv.dateTime).slice(-2);

        $(`[data-court=${rsv.courtId}]`).find($(`[data-time=${time}]`)).addClass("closed");
    })



})






// =================
// 코트 타입 / 실내외 / 주차여부
// =================

// 코트타입 체크
function checkCourtType(courtTypeId) {
    switch (courtTypeId) {
        case 1:
            return '하드 코트'
        case 2:
            return '클레이 코트'
        case 3:
            return '잔디 코트'
        case 4:
            return '앙투카 코트'
    }
};

// 실내/외 체크
function checkIndoor(indYn) {
    if (indYn) {
        return '실내';
    } else {
        return '야외'
    }
};

// 주차 가능 여부 체크
function checkParking(parkingArea) {
    if (parkingArea) {
        return '주차 가능';
    } else {
        return '주차장 없음'
    }
};
