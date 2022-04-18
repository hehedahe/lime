"use strict"


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


// =================
// 날짜 슬라이더
// =================
let dateWrapper = $('.date-wrapper');
let today = new Date();
const WEEKDAY = ['일','월','화','수','목','금','토'];
let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // 이번 달 마지막 날짜

for (let i = 0; i < 14 ; i++) {
    let no = today.getDay() + i > 6 ? today.getDay() + i - 7 : today.getDay() + i
    let week = WEEKDAY[no];
    let date = today.getDate() + i;

    if (date <= lastDate) {
        if (week == '토') {
            dateWrapper.append(`<button class="date-wrap swiper-slide sat">${date}일<br>${week}</button>`);
        } else if (week == '일') {
            dateWrapper.append(`<button class="date-wrap swiper-slide sun">${date}일<br>${week}</button>`);
        } else {
            dateWrapper.append(`<button class="date-wrap swiper-slide">${date}일<br>${week}</button>`);
        }
    } else {
        if (week == '토') {
            dateWrapper.append(`<button class="date-wrap swiper-slide sat">${date-lastDate}일<br>${week}</button>`);
        } else if (week == '일') {
            dateWrapper.append(`<button class="date-wrap swiper-slide sun">${date-lastDate}일<br>${week}</button>`);
        } else {
            dateWrapper.append(`<button class="date-wrap swiper-slide">${date-lastDate}일<br>${week}</button>`);
        }
    };
};

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



// =================
// 날짜 선택 후 css 유지
// =================
$('.date-wrap').on('click', function () {
    $('.date-wrap').removeClass('selected-date');
    $(this).addClass('selected-date');
})




