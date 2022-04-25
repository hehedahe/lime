"use strict"

import {Region1} from './region.js'



// ================
// 시도/시군구 선택
// ================
export function selectCity(e) {
    //var xxx = e[e.selectedIndex].text;
    if (e == 1) var cities = Region1.seoul;
    else if (e == 2) var cities = Region1.busan;
    else if (e == 3) var cities = Region1.daegu;
    else if (e == 4) var cities = Region1.incheon;
    else if (e == 5) var cities = Region1.gwangju;
    else if (e == 6) var cities = Region1.daejeon;
    else if (e == 7) var cities = Region1.ulsan;
    else if (e == 8) var cities = Region1.sejong;
    else if (e == 9) var cities = Region1.gyeonggi;
    else if (e == 10) var cities = Region1.gangwon;
    else if (e == 11) var cities = Region1.chungbuk;
    else if (e == 12) var cities = Region1.chungnam;
    else if (e == 13) var cities = Region1.jeonbuk;
    else if (e == 14) var cities = Region1.jeonnam;
    else if (e == 15) var cities = Region1.gyeongbuk;
    else if (e == 16) var cities = Region1.gyeongnam;
    else if (e == 17) var cities = Region1.jeju;

    var target = document.querySelector('#drop-city');
    target.options.length = 0;

    cities?.map((city, index) => {
        var opt = `<option value="${index}">${city}</option>`;
        $('#drop-city').append(opt);
    });

};