"use strict"

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.499, 127.029), //지도의 중심좌표.
    level: 6 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

var markerPosition;
var marker;

fetch("/field/list").then(function (response) {
    return response.json();
}).then(function (result) {
    for (const court of result) {
        // 마커가 표시될 위치입니다
        markerPosition = new kakao.maps.LatLng(court.lat, court.lng);
        //console.log("positon:::", markerPosition)

        // 마커를 생성합니다
        marker = new kakao.maps.Marker({
            position: markerPosition
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }
});

var opt = $("option");

// console.log(opt.data("id"));
opt.on('click', function() {
    aaa();
    console.log(opt.val())
})

function aaa() {
    fetch(`/city/findCity?regionId=${regionId}`).then(function (response) {
        return response.json();
    }).then(function (result) {
        console.log(result.data);
    })
}
