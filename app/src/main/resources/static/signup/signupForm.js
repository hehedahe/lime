"use strict"

import { Region2 } from '../common/region.js'

var region = document.querySelector("#region");

var regionValue = document.querySelector("input[name=region-value]");
var cityValue = document.querySelector("input[name=city-value]");
var priceValue = document.querySelector("input[name=price-value]");
var titleValue = document.querySelector("input[name=title-value]");


region.addEventListener('change', (event) => {
    let value = event.target.value;
    let add;
    if (value == "서울특별시") {
        add = Region2.seoul;
      } else if (value == "부산광역시") {
        add = Region2.busan;
      } else if (value == "대구광역시") {
        add = Region2.daegu;
      } else if (value == "인천광역시") {
        add = Region2.incheon;
      } else if (value == "광주광역시") {
        add = Region2.gwangju;
      } else if (value == "대전광역시") {
        add = Region2.daejeon;
      } else if (value == "울산광역시") {
        add = Region2.ulsan;
      } else if (value == "세종특별자치시") {
        add = Region2.sejong;
      } else if (value == "경기도") {
        add = Region2.gyeonggi;
      } else if (value == "강원도") {
        add = Region2.gangwon;
      } else if (value == "충청북도") {
        add = Region2.chungbuk;
      } else if (value == "충청남도") {
        add = Region2.chungnam;
      } else if (value == "전라북도") {
        add = Region2.jeonbuk;
      } else if (value == "전라남도") {
        add = Region2.jeonnam;
      } else if (value == "경상북도") {
        add = Region2.gyeongbuk;
      } else if (value == "경상남도") {
        add = Region2.gyeongnam;
      } else if (value == "제주특별자치도") {
        add = Region2.jeju;
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



