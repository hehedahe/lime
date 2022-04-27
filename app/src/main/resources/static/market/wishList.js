"use strict"

var itemList = document.querySelector("#item-list");

$(document).ready(function(e){
    // 버튼을 동적연결한다.
              
    fetch(`/member/getLoginUser`)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
      
      $(document).on("click", ".heart-click", function(){
        if (result.status == "fail") {
          window.alert("로그인 후 이용해주세요.");
          return;
        }
  
          let no = $(this).attr("idx");
  
          if ($(this).children("svg").attr("class") == "bi bi-heart") {
            fetch(`/market/like?itemId=${no}&done=${true}`)
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
            fetch(`/market/like?itemId=${no}&done=${false}`)
            .then(function(response) {
              return response.text();
            })
            .then(function(result) {
              console.log(result);
            });
  
            $(this).children("svg").toggleClass("bi-heart");
            $(this).html(`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(146, 219, 130)" class="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>`)
            
            $(`div[idx=${no}]`).remove();
          }
          
          //location.reload();
        });
      });
  
});

wishListFetch();

function wishListFetch() {
    $("div[name=card-col]").remove();
    $("div[id=empty-notice]").remove();
  
    fetch(`/market/getWish`)
    .then(function(response){
      return response.json();
    })
    .then(function(wishList){
      console.log(wishList.data, wishList.status);
      
      if (wishList.status == "fail") {
        window.alert("로그인 후 이용해주세요");
        return;
      }
  
      // 물건이 없는 경우
      if (wishList.data.length == 0) {
        var emptyNotice = document.createElement("div");
        emptyNotice.setAttribute('id', 'empty-notice');
        emptyNotice.innerHTML = `<p>찜한 물건이 없습니다!</p>`
        itemList.appendChild(emptyNotice);
      }
  
      for (var list of wishList.data) {
        let itemNo = list.itemId;
        let likeState = "";
  
          likeState = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(146, 219, 130)" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>`
  
        let photo = "../itembasic.png"
  
        let arr = [];
        let filePath = "";
        if (list.photo != "") {
          for (let obj of list.photo) {
            console.log(obj);
            arr.push(obj.imgId)
          }
          let arrMin = Math.min(...arr);
          console.log("최소값>> " + Math.min(...arr));
  
          for (let obj of list.photo) {
            if (obj.imgId == arrMin) {
              filePath = obj.filePath;
            }
          }
          console.log("최소값의 경로>> " + filePath);
          photo = "/market/photo?filename=" + filePath + "&type=main";
        }
  
        var cols = document.createElement("div");
        cols.setAttribute('class', 'col');
        cols.setAttribute('name', 'card-col');
        cols.setAttribute('idx', `${itemNo}`);
        cols.innerHTML = `<div class="card h-100" item-id=${list.itemId}>
        <a href="/market/view.html?no=${list.itemId}"><div id="photo-wrap" style="background-image: url(${photo});"></div></a>
        <a class="heart-click" idx=${itemNo}> ${likeState}</a>
        <div class="card-body">
          <h5 class="card-title"><a href="/market/view.html?no=${list.itemId}">${list.itemName}</a></h5>
          <span class="item-price">${list.itemCost}원 ${transState(list.transState)}</span><br>
          <span>${list.regionName} ${list.cityName}</span><br>
          <span class="view-count">조회 ${list.viewCount}</span>
        </div>
        </div>`
        itemList.appendChild(cols);
      }      
  })
}

function transState(state) {
    switch (state) {
      case "S" : return "";
      case "R" : return `<span class="R">예약중</span>`;
      case "E" : return `<span class="E">거래완료</span>`;
    }
  }