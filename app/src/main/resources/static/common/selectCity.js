"use strict"

import {marketMainRegion} from './region.js';

// ================
// 시도/시군구 선택
// ================
export function selectCity(e) {
    //var xxx = e[e.selectedIndex].text;
    if (e == 1) var cities = marketMainRegion.seoul;
    else if (e == 2) var cities = marketMainRegion.busan;
    else if (e == 3) var cities = marketMainRegion.daegu;
    else if (e == 4) var cities = marketMainRegion.incheon;
    else if (e == 5) var cities = marketMainRegion.gwangju;
    else if (e == 6) var cities = marketMainRegion.daejeon;
    else if (e == 7) var cities = marketMainRegion.ulsan;
    else if (e == 8) var cities = marketMainRegion.sejong;
    else if (e == 9) var cities = marketMainRegion.gyeonggi;
    else if (e == 10) var cities = marketMainRegion.gangwon;
    else if (e == 11) var cities = marketMainRegion.chungbuk;
    else if (e == 12) var cities = marketMainRegion.chungnam;
    else if (e == 13) var cities = marketMainRegion.jeonbuk;
    else if (e == 14) var cities = marketMainRegion.jeonnam;
    else if (e == 15) var cities = marketMainRegion.gyeongbuk;
    else if (e == 16) var cities = marketMainRegion.gyeongnam;
    else if (e == 17) var cities = marketMainRegion.jeju;

    var target = document.querySelector('#drop-city');
    target.options.length = 0;

    cities?.map((city, index) => {
        var opt = `<option value="${index}">${city}</option>`;
        $('#drop-city').append(opt);
    });

};