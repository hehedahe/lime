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
// 날짜 swiper
// =================
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




