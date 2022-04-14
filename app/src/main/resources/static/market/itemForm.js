"use strict"

import { itemFormRegion } from '../common/region.js'
import { textAreaAutoSizing } from '../common/textAreaAutoSizing.js';

var region = document.querySelector("#region");

$(document).ready(function(e) {
  textAreaAutoSizing();
});

region.addEventListener('change', (event) => {
    let value = event.target.value;
    let add;
    if (value == "서울특별시") {
        add = itemFormRegion.seoul;
      } else if (value == "부산광역시") {
        add = itemFormRegion.busan;
      } else if (value == "대구광역시") {
        add = itemFormRegion.daegu;
      } else if (value == "인천광역시") {
        add = itemFormRegion.incheon;
      } else if (value == "광주광역시") {
        add = itemFormRegion.gwangju;
      } else if (value == "대전광역시") {
        add = itemFormRegion.daejeon;
      } else if (value == "울산광역시") {
        add = itemFormRegion.ulsan;
      } else if (value == "세종특별자치시") {
        add = itemFormRegion.sejong;
      } else if (value == "경기도") {
        add = itemFormRegion.gyeonggi;
      } else if (value == "강원도") {
        add = itemFormRegion.gangwon;
      } else if (value == "충청북도") {
        add = itemFormRegion.chungbuk;
      } else if (value == "충청남도") {
        add = itemFormRegion.chungnam;
      } else if (value == "전라북도") {
        add = itemFormRegion.jeonbuk;
      } else if (value == "전라남도") {
        add = itemFormRegion.jeonnam;
      } else if (value == "경상북도") {
        add = itemFormRegion.gyeongbuk;
      } else if (value == "경상남도") {
        add = itemFormRegion.gyeongnam;
      } else if (value == "제주특별자치도") {
        add = itemFormRegion.jeju;
      } else if(value == "전체") {
        add = ["도시"];
      }
      city.options.length = 1;
    
      for (let property in add) {
        let opt = document.createElement("option");
        opt.value = add[property];
        opt.innerHTML = add[property];
        city.appendChild(opt);
      }
    
});