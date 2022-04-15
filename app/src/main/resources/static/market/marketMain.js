"use strict"

import { marketMainRegion } from '../common/region.js'

var itemList = document.querySelector("#item-list");
var regionSelect = document.querySelector("#region");
var city = document.getElementById("city");

$(document).ready(function(e){
            
    // 버튼을 동적연결한다.
    $(document).on("click", ".heart-click", function(){
        let no = $(this).attr("idx");

        if ($(this).children("svg").attr("class") == "bi bi-heart") {
          fetch(`/like/list?itemId=${no}&done=${true}`)
          .then(function(response) {
            return response.text();
          })
          .then(function(result) {
            console.log(result);
          });

          $(this).children("svg").toggleClass("bi-heart-fill");
          $(this).html(`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(146, 219, 130)" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>`)
        }
        else if ($(this).children("svg").attr("class") == "bi bi-heart-fill") {
          fetch(`/like/list?itemId=${no}&done=${false}`)
          .then(function(response) {
            return response.text();
          })
          .then(function(result) {
            console.log(result);
          });

          $(this).children("svg").toggleClass("bi-heart");
          $(this).html(`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>`)
        }
    });
});


function listFetch() {
  $("div[name=card-col]").remove();
  $("div[id=empty-notice]").remove();
  fetch(`/market/list?regionName=${regionSelect.value}&cityName=${city.value}&checked=${$("#nav-checkbox").is(":checked")}
  &keyword=${$("input[type=search]").val()}`)
  .then(function(response){
    return response.json();
  })
  .then(function(lists){
    if (lists.status == "fail") {
      window.alert("서버 요청 오류!");
      return;
    }
    if (lists.data.length == 0) {
      var emptyNotice = document.createElement("div");
      emptyNotice.setAttribute('id', 'empty-notice');
      emptyNotice.innerHTML = `<p>찾으시는 물건이 없습니다!</p>`
      itemList.appendChild(emptyNotice);
    }
    console.log(lists.data);
    for (var list of lists.data) {
      let transState1 = list.transState;
      if (transState1 == "S") {
      transState1 = "";
      }
      else if (transState1 == "R") {
        transState1 = `<span class="R">예약중</span>`;
      }
      else if (transState1 == "E") {
        transState1 = `<span class="E">거래완료</span>`;
      }

      var cols = document.createElement("div");
      cols.setAttribute('class', 'col');
      cols.setAttribute('name', 'card-col');
      cols.innerHTML = `<div class="card h-100" item-id=${list.itemId}>
      <img src="../ok_photo.jfif" class="card-img-top" alt="...">
      <a class="heart-click" idx=${list.itemId}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-heart" viewBox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
      </svg></a>
      <div class="card-body">
        <h5 class="card-title"><a href="/market/view.html?no=${list.itemId}">${list.itemName}</a></h5>
        <span class="item-price">${list.itemCost}원 ${transState1}</span><br>
        <span>${list.regionName} ${list.cityName}</span><br>
        <span class="view-count">조회 ${list.viewCount}</span>
      </div>
      </div>`
      itemList.appendChild(cols);
    }      
})
}


listFetch(); // 첫 화면

// 지역 선택
regionSelect.addEventListener('change', (event) => {
    let value = event.target.value;
    let add;
    if (value == "서울특별시") {
        add = marketMainRegion.seoul;
      } else if (value == "부산광역시") {
        add = marketMainRegion.busan;
      } else if (value == "대구광역시") {
        add = marketMainRegion.daegu;
      } else if (value == "인천광역시") {
        add = marketMainRegion.incheon;
      } else if (value == "광주광역시") {
        add = marketMainRegion.gwangju;
      } else if (value == "대전광역시") {
        add = marketMainRegion.daejeon;
      } else if (value == "울산광역시") {
        add = marketMainRegion.ulsan;
      } else if (value == "세종특별자치시") {
        add = marketMainRegion.sejong;
      } else if (value == "경기도") {
        add = marketMainRegion.gyeonggi;
      } else if (value == "강원도") {
        add = marketMainRegion.gangwon;
      } else if (value == "충청북도") {
        add = marketMainRegion.chungbuk;
      } else if (value == "충청남도") {
        add = marketMainRegion.chungnam;
      } else if (value == "전라북도") {
        add = marketMainRegion.jeonbuk;
      } else if (value == "전라남도") {
        add = marketMainRegion.jeonnam;
      } else if (value == "경상북도") {
        add = marketMainRegion.gyeongbuk;
      } else if (value == "경상남도") {
        add = marketMainRegion.gyeongnam;
      } else if (value == "제주특별자치도") {
        add = marketMainRegion.jeju;
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
    
      listFetch();
});

// 도시 선택
city.addEventListener('change', (event) => {
    listFetch();
})

// 거래가능만 보기
$("#nav-checkbox").on("change", function(){
  console.log($("#nav-checkbox").is(":checked"));
  listFetch();
});

// 검색
$("input[type=search]").keyup(function(e) {
    if (e.keyCode == 27) {
      $(e.target).val("");

    } else if (e.keyCode == 13) {
      if ($(e.target).val() == "") {
        window.alert("검색어를 입력해주세요.");
        //Swal.fire("필수 입력 항목이 비어 있습니다.");
        return;
      }
      console.log($(e.target).val());
      console.log($("input[type=search]").val());
      listFetch();
      
    }
  })