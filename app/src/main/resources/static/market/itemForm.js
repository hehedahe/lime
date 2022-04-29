"use strict"

import { Region2 } from '../common/region.js'
import { textAreaAutoSizing } from '../common/textAreaAutoSizing.js';

var region = document.querySelector("#region");

var regionValue = document.querySelector("input[name=region-value]");
var cityValue = document.querySelector("input[name=city-value]");
var priceValue = document.querySelector("input[name=price-value]");
var titleValue = document.querySelector("input[name=title-value]");
var contentValue = document.querySelector("textarea");

$(document).ready(function(e) {
  textAreaAutoSizing();

  
  $(document).on("click", "#complete-btn", function() {
    if ($("#region").val() == null || 
        $("#city").val() == "도시" ||
        $("#item-price").val() == "" ||
        $("#item-name").val() == "" ||
        $("#item-content").val() == "" ||
        !$("#btnAtt").val()) {
      window.alert("모든 항목을 입력해주세요");
      return;
    }
    
    
    var fd = new FormData(document.forms.namedItem("form1"));
    
    fetch("/market/add", { 
        method: "POST",
        body: fd
      }) 
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        console.log(text);
        location.href = "marketMain.html";
      });
  });

  $(document).on("click", "#cancel-btn", function() {
    location.href = "marketMain.html";
  });

});


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

( /* att_zone : 이미지들이 들어갈 위치 id, btn : file tag id */
  function imageView(att_zone, btn){

    var attZone = document.getElementById(att_zone);
    var btnAtt = document.getElementById(btn)
    var sel_files = [];
    
    // 이미지와 체크 박스를 감싸고 있는 div 속성
    var div_style = 'display:inline-block;position:relative;'
                  + 'width:150px;height:120px;margin:5px;';
    // 미리보기 이미지 속성
    var img_style = 'width:100%;height:100%;z-index:none';
    // 이미지안에 표시되는 체크박스의 속성
    var chk_style = 'width:20px;height:20px;position:absolute;border:none;font-weight:bold;'
                  + 'right:0px;z-index:999;background-color:rgba(255,255,255,0.1);color:#f00';
  
    btnAtt.onchange = function(e){
      console.log("dddddd");
      $("div[name=img-div]").remove();
      var files = e.target.files;
      var fileArr = Array.prototype.slice.call(files)
      for(let f of fileArr){
        imageLoader(f);
      }
    }

    
    /*첨부된 이미지들을 배열에 넣고 미리보기 */
    var imageLoader = function(file){
      sel_files.push(file);
      var reader = new FileReader();
      reader.onload = function(ee){
        let img = document.createElement('img')
        img.setAttribute('style', img_style)
        img.src = ee.target.result;
        attZone.appendChild(makeDiv(img, file));
      }
      
      reader.readAsDataURL(file);
    }
    
    /*첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환 */
    var makeDiv = function(img, file){
      var div = document.createElement('div')
      div.setAttribute('style', div_style)
      div.setAttribute('name', 'img-div')
      
      var btn = document.createElement('input')
      btn.setAttribute('type', 'button')
      btn.setAttribute('value', 'x')
      btn.setAttribute('delFile', file.name);
      btn.setAttribute('style', chk_style);
      btn.onclick = function(ev){
        var ele = ev.target;
        var delFile = ele.getAttribute('delFile');
        for(var i=0 ;i<sel_files.length; i++){
          if(delFile== sel_files[i].name){
            sel_files.splice(i, 1);      
          }
        }
        
        let dt = new DataTransfer();
        for(let f in sel_files) {
          var file = sel_files[f];
          dt.items.add(file);
        }
        btnAtt.files = dt.files;
        var p = ele.parentNode;
        attZone.removeChild(p)
      }
      div.appendChild(img)
      div.appendChild(btn)
      return div
    }
  }
)('att_zone', 'btnAtt')

