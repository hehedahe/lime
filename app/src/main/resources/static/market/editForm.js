"use strict"

import { Region1 } from '../common/region.js'
import { textAreaAutoSizing } from '../common/textAreaAutoSizing.js';
import { getLoginUser } from '../common/apiList.js';
import { marketMain } from '../common/link.js';

var regionName = document.querySelector("#region");
var cityName = document.querySelector("#city");
var itemNo = document.querySelector("input[name=itemId]");
var itemPrice = document.querySelector("#item-price");
var itemName = document.querySelector("#item-name");
var itemContent = document.querySelector("#item-content");
var attZone = document.querySelector("#att_zone");

const loginUser = await getLoginUser();

$(document).ready(function(e) {
    textAreaAutoSizing();

    $(document).on("click", "#complete-btn", function() {
        if ($("#item-price").val() == "" ||
            $("#item-name").val() == "" ||
            $("#item-content").val() == "") {
          window.alert("모든 항목을 입력해주세요.");
          return;
        }
        if ($("#city").val() == "도시") {
            window.alert("도시를 선택해주세요.");
            return;
        }

        var fd = new FormData(document.forms.namedItem("form1"));
        
            fetch("/market/update", {
                method: "POST",
                body: new URLSearchParams(fd)
            }).then(function(response) {
                return response.json();
            }).then(function(result) {
            if (result.status == "success") {
                location.href = `/market/view.html?no=${no}`;
            } else {
                alert("게시글 변경 실패!");
            }
            });
       
    });

    $(document).on("click", "#cancel-btn", function() {
        location.href = `/market/view.html?no=${no}`;
    });
  
});

var arr = location.href.split("?");
  console.log(arr);

  if (arr.length == 1) {
    alert("요청 형식이 옳바르지 않습니다.")
    throw "URL 형식 오류!";
  }

  var qs = arr[1];
  console.log(qs);

  var params = new URLSearchParams(qs);
  var no = params.get("no");

  if (no == null) {
    alert("해당 게시물이 없습니다!");
    throw "파라미터 오류!";
  }

  fetch(`/market/get?no=${no}`)
    .then(function(response){
        return response.json();
    })
    .then(function(item){
        if (item.status == "fail") {
        window.alert("서버 요청 오류!");
        return;
        }
        
        itemNo.value = item.data.itemId;
        console.log(loginUser.data.userId);

        let arr = item.data.content.split("\n");
        const areaHeight = 28 * arr.length;
        $("#item-content").css('height', `${areaHeight}px`);
        // if (item.data.userId != loginUser.data.userId) {
        //     window.alert("권한이 없습니다!");
        //     return;
        // }
        console.log(item.data);
        regionName.innerHTML = `<option selected hidden value="${item.data.regionName}">${item.data.regionName}</option>
        <option value="서울특별시">서울특별시</option>
        <option value="부산광역시">부산광역시</option>
        <option value="대구광역시">대구광역시</option>
        <option value="인천광역시">인천광역시</option>
        <option value="광주광역시">광주광역시</option>
        <option value="대전광역시">대전광역시</option>
        <option value="울산광역시">울산광역시</option>
        <option value="세종특별자치시">세종특별자치시</option>
        <option value="경기도">경기도</option>
        <option value="강원도">강원도</option>
        <option value="충청북도">충청북도</option>
        <option value="충청남도">충청남도</option>
        <option value="전라북도">전라북도</option>
        <option value="전라남도">전라남도</option>
        <option value="경상북도">경상북도</option>
        <option value="경상남도">경상남도</option>
        <option value="제주특별자치도">제주특별자치도</option>`;
        cityName.innerHTML = `<option value=${item.data.cityName}>${item.data.cityName}</option>`;
        itemPrice.value = item.data.itemCost;
        itemName.value = item.data.itemName;
        itemContent.value = item.data.content;

        for (let photo of item.data.photo) {
            console.log(photo);
            let filePath = "/market/photo?filename=" + photo.filePath + "&type=main";
            // 이미지와 체크 박스를 감싸고 있는 div 속성
            let div_style = 'display:inline-block;position:relative;'
            + 'width:150px;height:120px;margin:5px;';
            // 미리보기 이미지 속성
            let img_style = 'width:100%;height:100%;z-index:none';

            let img = document.createElement('img');
            img.setAttribute('style', img_style);
            img.setAttribute('src', filePath);
            let div = document.createElement('div');
            div.setAttribute('style', div_style);

            div.appendChild(img);
            attZone.appendChild(div);

        }
    });

    regionName.addEventListener('change', (event) => {
        let value = event.target.value;
        let add;
        if (value == "서울특별시") {
            add = Region1.seoul;
          } else if (value == "부산광역시") {
            add = Region1.busan;
          } else if (value == "대구광역시") {
            add = Region1.daegu;
          } else if (value == "인천광역시") {
            add = Region1.incheon;
          } else if (value == "광주광역시") {
            add = Region1.gwangju;
          } else if (value == "대전광역시") {
            add = Region1.daejeon;
          } else if (value == "울산광역시") {
            add = Region1.ulsan;
          } else if (value == "세종특별자치시") {
            add = Region1.sejong;
          } else if (value == "경기도") {
            add = Region1.gyeonggi;
          } else if (value == "강원도") {
            add = Region1.gangwon;
          } else if (value == "충청북도") {
            add = Region1.chungbuk;
          } else if (value == "충청남도") {
            add = Region1.chungnam;
          } else if (value == "전라북도") {
            add = Region1.jeonbuk;
          } else if (value == "전라남도") {
            add = Region1.jeonnam;
          } else if (value == "경상북도") {
            add = Region1.gyeongbuk;
          } else if (value == "경상남도") {
            add = Region1.gyeongnam;
          } else if (value == "제주특별자치도") {
            add = Region1.jeju;
          } else if(value == "전체") {
            add = ["도시"];
          }
          city.options.length = 0;
        
          for (let property in add) {
            let opt = document.createElement("option");
            opt.value = add[property];
            opt.innerHTML = add[property];
            city.appendChild(opt);
          }
        
    });

    $("#city").on("click", function() {
        console.log($(this).val());
    })