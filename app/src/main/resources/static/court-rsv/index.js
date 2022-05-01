import {selectCity} from '../common/selectCity.js'
import {checkCourtType, checkIndoor, checkParking} from '../common/typeCheck.js'
import {
    fieldList,
    getCourt,
    courtList,
    findRegion,
    findCity,
    rsvsByDate
} from '../common/apiList.js'


// ***예약 페이지로 넘길 데이터
var expectedRsv = {
    fieldId: '',
    courtId: '',
    date: '',
    day: '',
    time: ''
};

// 현재 날짜
let today = new Date();
let now = today.getHours();
console.log(now);

// 날짜 형식 YYMMDD
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let year = ("0" + today.getFullYear()).slice(-2);
let date = today.getDate();
expectedRsv.date = year + month + ("0" + date).slice(-2); // ***YYMMDD 형태로 현재 날짜 디폴트로 담아두기
const WEEKDAY = ['일','월','화','수','목','금','토'];
expectedRsv.day = WEEKDAY[today.getDay()];


// 지난 시간 마감 처리
timeCheck(now);




// =====================================
//             카카오 지도 API
// =====================================

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




// =====================================
//           전체 코트 마커 뿌리기
// =====================================

var marker, markerPosition;

(async function () {
    const response = await fieldList();

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

function getCitiName(e) {
    // 시도 → 시군구
    selectCity(e.target.value);
}




// =====================================
//   시도/시군구 sorting & 중심좌표 뿌리기
// =====================================

// 시도
$('#drop-region').on('change', async function (e) {
    e.preventDefault();
    e.stopPropagation();

    // 코트 카드 리셋
    let card = $('#crt-card');
    if ($('#crt-card div') != null) {
        card.empty()
    };

    // 시도 → 시군구
    selectCity(e.target.value);

    const coordinateRegion = await findRegion(Number($('#drop-region option:selected').val()));
    let regionLat = coordinateRegion.region?.regionLat;
    let regionLng = coordinateRegion.region?.regionLng;

    // 중심좌표 이동
    panTo(regionLat, regionLng);

    // 중심좌표 반경 내에 있는 테니스장 리스트
    const crtByRegion = await courtList(regionLat, regionLng);

    crtByRegion?.map((fields) => {
        card.append(
            `<div class="card-cover swiper-slide">
                <button class="card-btn card border-0" type="button" data-value="${fields.fieldId}">
                    <div class="card-body">
                        <h5 class="card-title" style="height: 48px">${fields.name}</h5>
                        <p class="card-text">#${checkCourtType(fields.courtTypeId)}</p>
                        <div class="content3">
                            <p class="card-text">${fields.distance} km</p>
                            <a href="view.html?fieldId=${fields.fieldId}" class="btn btn-sm info-btn">정보</a>
                        </div>
                    </div>
                </button>
            </div>`
        );
    });

    if (sessionStorage.getItem('fieldId') != null) {
        let fieldId = sessionStorage.getItem('fieldId');
        $(`.card-btn[data-value=${fieldId}]`).click();
    }
});

// 시군구
$('#drop-city').on('change', async function (e) {
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
                <button class="card-btn card border-0" type="button" data-value="${fields.fieldId}">
                    <div class="card-body">
                        <h5 class="card-title" style="height: 48px">${fields.name}</h5>
                        <p class="card-text">#${checkCourtType(fields.courtTypeId)}</p>
                        <div class="content3">
                            <p class="card-text">${fields.distance} km</p>
                            <a href="view.html?fieldId=${fields.fieldId}" class="btn btn-sm info-btn">정보</a>
                        </div>
                    </div>
                </button>
            </div>`);
    });

    if (sessionStorage.getItem('fieldId') != null) {
        let fieldId = sessionStorage.getItem('fieldId');
        $(`.card-btn[data-value=${fieldId}]`).click();
    }
});




// =====================================
//             카드 클릭 시 효과
// =====================================

var fieldId;

$(document).on('click', '.card-btn', async function (e) {
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
    fieldId = $(this).closest('.card-btn').attr('data-value');


    // ***선택한 테니스장 번호 담아두기
    expectedRsv.fieldId = fieldId;

    // 선택된 카드 정보 한개 가져오기
    let response = await getCourt(fieldId);
    let court = response.data;
    console.log("hereL:::::::::::::::::::::::", court)

    // 카드 상세정보 뿌려주기
    $('#crt-name').text(court.name).attr('data-court-id', court.fieldId);
    $('#crt-addr').text(court.addr);
    $('#crt-indYn').text(checkIndoor(court.indYn) + '  ·');
    $('#crt-type').text(checkCourtType(court.courtTypeId) + '  ·');
    $('#crt-parking').text(checkParking(court.parkingArea));

    // 현재 예약되어 있는 시간 비활성화
    const res = await rsvsByDate(expectedRsv.date, court.fieldId);

    res.data?.map((rsv) => {

        let time = ("0" + rsv.dateTime).slice(-2);
        $(`[data-court=${rsv.courtId}]`).find($(`[data-time=${time}]`)).attr('disabled', true).addClass('closed');
    });
});





// =====================================
//      해당 날짜 예약 리스트 가져오기
// =====================================

// sweetalert
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

$(document).on('click', '.date-wrap', async function (e) {
    $('.sche-btn').removeClass('closed').attr('disabled', false);
    let clickedDate = $(e.target).text().slice(0,2);

    if (date == clickedDate) {
        timeCheck(now);
    }
    if (fieldId == null) {
        Toast.fire({
            icon: 'info',
            title: '구장을 먼저 선택해주세요! 🎾'
        });
    } else {

        // ***선택 날짜, 요일 담아두기
        expectedRsv.date = $(this).attr('data-date');
        expectedRsv.day = $(this).find('span').text();


        const res = await rsvsByDate(expectedRsv.date, expectedRsv.fieldId);
        console.log("date:::::::::::", expectedRsv.date)

        res.data?.map((rsv) => {

            console.log(rsv)

            let time = ("0" + rsv.dateTime).slice(-2);
            $(`[data-court=${rsv.courtId}]`).find($(`[data-time=${time}]`)).attr('disabled', true).addClass('closed');
        })
    }
});




// =====================================
//        상세 페이지로 데이터 넘기기
// =====================================
$('.sche-btn').on('click', function (e) {
    if (fieldId != null ) {
        expectedRsv.courtId = $(e.target).parent('div').attr('data-court');
        expectedRsv.time = $(e.target).attr('data-time');

        console.log(expectedRsv);

        let url = new URLSearchParams(expectedRsv).toString();

        sessionStorage.setItem("courtId", expectedRsv.courtId);
        sessionStorage.setItem("fieldId", expectedRsv.fieldId);
        sessionStorage.setItem("date", expectedRsv.date);
        sessionStorage.setItem("region", $('#drop-region').val());
        sessionStorage.setItem("city", $('#drop-city').val());

        location.href = `view.html?${url}`;
    } else {
        Toast.fire({
            icon: 'info',
            title: '구장을 먼저 선택해주세요! 🎾'
        });
    }
});





// 지난 시간 마감 처리 함수
function timeCheck(now) {
    for (var i = 6; i <= now; i++) {
        let no;

        if (i < 10) {
            no = '0' + i;
        } else {
            no = i;
        }

        let targetTime = $(`.sche-btn[data-time=${no}]`).attr('data-time');

        if (targetTime <= now) {
            $(`.sche-btn[data-time=${no}]`).attr('disabled', true).addClass('closed');
        }
        i++;
    }
};


console.log("test:::::::::::::::", expectedRsv);




// =====================================
// sessionStorage에 유저가 선택한 정보 보관
// =====================================
// localStorage.setItem("v1", "aaa");
// sessionStorage.setItem("v2", "bbb");
console.log(sessionStorage.getItem("courtId"))
console.log(sessionStorage.getItem("fieldId"))
console.log(sessionStorage.getItem("date"))
console.log(sessionStorage.getItem("region"))
console.log(sessionStorage.getItem("city"))

if (sessionStorage.getItem("courtId") != null) {
        $('#drop-region').val(sessionStorage.getItem("region")).change();
        $('#drop-city').val(sessionStorage.getItem("city")).change();
}




// =====================================
//              유저 선호 지역
// =====================================
