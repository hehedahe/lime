"use strict"

import {selectCity} from '../common/selectCity.js'
import {fieldList, courtList, findRegion, findCity} from '../common/apiList.js'


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

// // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
// map.setZoomable(false);

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
            image: markerImage,      // 마커이미지 설정
            clickable: true          // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
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

    cardEffect();

    // 시,도 선택
    selectCity(dropRegion.val());

    // 시,도 좌표 찾기
    const coordinateRegion = await findRegion(Number($('#drop-region option:selected').val()));

    let regionLat = coordinateRegion.region?.regionLat;
    let regionLng = coordinateRegion.region?.regionLng;

    // 중심좌표 이동
    panTo(regionLat, regionLng);

    // 시,도 코트 리스트 카드로 뿌리기
    const crtByRegion = await courtList(regionLat, regionLng);
    console.log("crtByRegion:::::::::::::::", crtByRegion);

    crtByRegion?.map((courts) => {
        $('#crt-card').append(
           `<div class="card-cover swiper-slide">
                <button class="card-btn card border-0">
                    <div class="card-body">
                        <h5 class="card-title" style="height: 48px" data-id="${courts.fieldId}">${courts.name}</h5>
                        <p class="card-text">#${checkCourtType(courts.courtTypeId)}</p>
                        <div class="content3">
                            <p class="card-text">${courts.distance}KM</p>
                            <a href="court_rsv/view.html" class="btn btn-sm info-btn">정보</a>
                        </div>
                    </div>
                </button>
            </div>`
        );
    });
});

function cardEffect() {
    // 카드 리셋
    let card = $('#crt-card');
    if ($('#crt-card div') != null) {
        card.empty();
    };

    $('.card').on('click', function () { // 지도에 있는 카드 리스트 중 하나를 클릭하면
        // 카드의 배경색이 바뀌고, 이전에 선택된 카드는 다시 원래대로 돌아간다.
        $('.card').removeClass('selected-card');
        $(this).addClass('selected-card');
        // 정보 버튼
        $('.info-btn').removeClass('changed-color');
        console.log($('.info-btn'))
        $(this).find('a').addClass('changed-color');

        // scroll 이동
        var offset = $('#swiper-temp2').offset();
        $('html').animate({scrollTop: offset.top}, 400);
    });
};


// 코트 상세 리셋
let info = $('#selected-crt');
if ($('#selected-crt h4') != null) {
    info.empty();
}

// 코트 상세 정보
// $('#selected-crt').html(
//     `<h4 id="crt-name">${regionCourt.name}</h4>
//      <p class="mb-1">${regionCourt.address}</p>
//      <div class="d-flex">
//          <span>${checkIndoor(regionCourt.indYn)}</span>
//          <span class="dot mx-2">·</span>
//          <span>${checkCourtType(regionCourt.courtType)}</span>
//          <span class="dot mx-2">·</span>
//          <span>${checkParking(regionCourt.parking)}</span>
//      </div>`
// );



// 시군구
dropCity.on('change', async function (e) {
    e.preventDefault();
    e.stopPropagation();

    cardEffect();

    let city = $('#drop-city option:checked').text();
    let regionNo = $('#drop-region option:selected').val();

    const coordiCity = await findCity(city, regionNo);

    let cityLat = coordiCity.cityLat;
    let cityLng = coordiCity.cityLng;

    panTo(cityLat, cityLng);

    const crtByCity = await courtList(cityLat, cityLng);

    crtByCity?.map((courts) => {
        $('#crt-card').append(
            `<div class="card-cover swiper-slide">
                <button class="card-btn card border-0">
                    <div class="card-body">
                        <h5 class="card-title" style="height: 48px">${courts.name}</h5>
                        <p class="card-text">#${checkCourtType(courts.courtTypeId)}</p>
                        <div class="content3">
                            <p class="card-text">${courts.distance}KM</p>
                            <a href="localhost:8080/court_rsv/view.html" class="btn btn-sm info-btn">정보</a>
                        </div>
                    </div>
                </button>
            </div>`
        );
    });


        //
        // // 코트 상세 정보
        // $('#selected-crt').html(
        //     `<h4 id="crt-name">${cityCourt.name}</h4>
        //      <p class="mb-1">${cityCourt.address}</p>
        //      <div class="d-flex">
        //          <span>${checkIndoor(cityCourt.indYn)}</span>
        //          <span class="dot mx-2">·</span>
        //          <span>${checkCourtType(cityCourt.courtType)}</span>
        //          <span class="dot mx-2">·</span>
        //          <span>${checkParking(cityCourt.parking)}</span>
        //      </div>`
        // )
});


// =================
// 코트 타입
// =================
function checkCourtType(courtTypeNo) {
    switch (courtTypeNo) {
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

// =================
// 실내/외 타입
// =================
function checkIndoor(indYn) {
    if (indYn) {
        return '실내';
    } else {
        return '야외'
    }
};

// =================
// 주차 유무
// =================
function checkParking(parkingArea) {
    if (parkingArea) {
        return '주차 가능';
    } else {
        return '주차장 없음'
    }
};