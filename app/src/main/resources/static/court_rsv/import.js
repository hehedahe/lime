"use strict"

import {selectCity} from '../common/selectCity.js'
import {fieldList, findRegion} from '../common/apiList.js'


// =================
// 도시 선택하여 시군구 sorting
// =================
const dropRegion = $('#drop-region');

dropRegion.on('change', async function (e) {
    e.preventDefault();
    e.stopPropagation();

    selectCity(dropRegion.val());
    $('#drop-city option:selected').html('전체');

    // const latLng = await findRegion(Number($('#drop-region option:selected').val()));
    // console.log(latLng);
    // let regionLat1 = latLng.region.regionLat;
    // let regionLng1 = latLng.region.regionLng
    //
    // panTo(regionLat1, regionLng1);
});


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

// async function panTo(lat, lng) {
//     let lati = await lat
//     let longi = await lng
//     // 이동할 위도 경도 위치를 생성합니다
//     var moveLatLon = new kakao.maps.LatLng(lati, longi);
//
//     // 지도 중심을 부드럽게 이동시킵니다
//     // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
//     map.panTo(moveLatLon);
// }


// =================
// 전체 코트 마커 뿌리기
// =================
(async function () {
    var response = await fieldList();

    response?.map((court) => {
        // 마커가 표시될 위치입니다
        var markerPosition = new kakao.maps.LatLng(court.lat, court.lng);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 마커이미지 설정
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    })
})();


// =================
//  시도 중심좌표 뿌리기
// =================
