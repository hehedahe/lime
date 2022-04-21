"use strict"

// =================
// 날짜 슬라이더
// =================
let today = new Date();
const WEEKDAY = ['일','월','화','수','목','금','토'];
today.setDate(today.getDate() - 1);

for (let i = 0; i < 14; i++) {
    today.setDate(today.getDate() + 1);
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let year = ("0" + today.getFullYear()).slice(-2);
    let date = today.getDate();
    let dateFormat = year + month + ("0" + date).slice(-2);
    let day = WEEKDAY[today.getDay()];

    if (day == '토') {
        $(`button[data-order=${i}]`).html(`${date}<span class="day${i}">${day}</span>`)
            .addClass('sat').attr('data-date', dateFormat)
    } else if (day == '일') {
        $(`button[data-order=${i}]`).html(`${date}<span class="day${i}">${day}</span>`)
            .addClass('sun').attr('data-date', dateFormat)
    } else {
        $(`button[data-order=${i}]`).html(`${date}<span class="day${i}">${day}</span>`)
            .attr('data-date', dateFormat)
    }
}

// 날짜 swiper
var swiper = new Swiper(".date-swiper", {
    slidesPerView: 7,
    slidesPerGroup: 7,
    spaceBetween: 10, // slidesPerView 여백
    simulateTouch: false,
    direction: getDirection(),
    navigation: {
        nextEl: "#date-next",
        prevEl: "#date-prev"
    },
    on: {
        resize: function () {
            swiper.changeDirection(getDirection());
        }
    }
});

function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 720 ? "vertical" : "horizontal";
    return direction;
}

// 날짜 선택 후 css 유지
$('.date-wrap').on('click', function () {
    $('.date-wrap').removeClass('selected-date');
    $(this).addClass('selected-date');
})


// =================
// 코트 카드 swiper
// =================
var swiper2 = new Swiper("#info-card", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    simulateTouch: false,
    direction: getDirection(),
    navigation: {
        nextEl: "#c-next",
        prevEl: "#c-prev"
    },
    on: {
        resize: function () {
            swiper2.changeDirection(getDirection());
        }
    }
});






