"use strict"

import { textAreaAutoSizing } from '../common/textAreaAutoSizing.js';
import { getLoginUser } from '../common/apiList.js';

$(document).ready(function(e){

    fetch(`/member/getLoginUser`)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
            
    // 버튼을 동적연결한다.
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

            getLikeCnt();
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

            getLikeCnt();
        }
    });

    $(document).on("change", "#state-select", function() {
        console.log($(this).val());
        console.log("아이템번호>>"+itemNo);
        transState = $(this).val();
        console.log(transState);
        fetch(`/market/updateState?itemId=${itemNo}&transState=${transState}`)
        .then(function(response) {
            return response.text();
        })
        .then(function(result) {
            console.log(result);
        });
    });

    $(document).on("click", "#i-delete", function() {
        console.log("삭제!");
        console.log($(this).attr("idx"));
        deleteItem($(this).attr("idx"));
    })
});
    
    // textarea 크기 자동 조절
    textAreaAutoSizing();
});

var itemNo = 0;
var transState = "";

  var itemBox = document.querySelector("#item-box");
  var itemRegionP = document.querySelector("#item-region-p");
  var itemTitleP = document.querySelector("#item-title-p");
  var itemPriceP = document.querySelector("#item-price-p");
  var userName = document.querySelector("#user-name");
  var manner = document.querySelector("#manner");
  var rgtDate = document.querySelector("#rgt-date");
  var itemContentP = document.querySelector("#item-content-p");
  var itemImgWrap = document.querySelector("#item-img-wrap");
  var heartClick = document.querySelector(".heart-click");
  var likeCnt = document.querySelector("#like-count");
  var etc = document.querySelector("#etc");
  var menuWrap = document.querySelector("#menu-wrap");
  var iDelete = document.querySelector("#i-delete");

  var replyView = document.querySelector("#reply-view");

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

  itemViewFetch();

function itemViewFetch() {
// 좋아요 테이블 가져오기
  fetch(`/market/getLike`)
  .then(function(response){
      return response.json();
  })
  .then(function(itemLike){

    fetch(`/market/get?no=${no}`)
    .then(function(response){
        return response.json();
    })
    .then(function(item){
        if (item.status == "fail") {
        window.alert("서버 요청 오류!");
        return;
        }
        console.log(loginUser.data.userId);
        
        

        let etcContent = `<button id="ask" type="button">구매 문의하기</button>`
        if (item.data.userId == loginUser.data.userId) {
            console.log("작성자와 같음!");
            etcContent = `<select class="form-select border text-start" id="state-select">
            <option id="kkk" selected disabled hidden value=${item.data.transState}>${transState1(item.data.transState)}</option>
            <option value="S">판매중</option>
            <option value="R">예약중</option>
            <option value="E">거래완료</option>`;
            
            menuWrap.innerHTML = `<a class="nav-link my-1" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" ><img src="../asset/image/menu.png"></a>
            <ul class="dropdown-menu my-4">
              <li><a class="dropdown-item" href="/market/editForm.html?no=${item.data.itemId}">수정하기</a></li>
              <li><a class="dropdown-item" id="i-delete" idx=${item.data.itemId}>삭제하기</a></li>
            </ul>`
            //console.log("상태값>>" + );
        } else {
            menuWrap.innerHTML = `<a class="nav-link my-1" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" ><img src="../asset/image/menu.png"></a>
            <ul class="dropdown-menu my-4">
              <li><a class="dropdown-item" href="#">신고하기</a></li>
            </ul>`
        }
        console.log($("#kkk").val());

        itemNo = item.data.itemId;
        transState = item.data.transState;
        let likeState = "";
        const arrLike = [];

        for (let list of itemLike.data) {
            arrLike.push(list.itemId);
        }

        if (arrLike.includes(itemNo)) {
            likeState = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(146, 219, 130)" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>`
        } else {
            likeState = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(146, 219, 130)" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>`
        }

        

        let photoFilePath ="";
        for (let photo of item.data.photo) {
            photoFilePath += `<div class="photo-wrap"><img src="/market/photo?filename=${photo.filePath}&type=view"></div>`;
            console.log(photoFilePath);
        }
        
        console.log(item.data);
        
        heartClick.setAttribute("idx",`${item.data.itemId}`);
        itemRegionP.innerHTML = `${item.data.regionName} ${item.data.cityName}`;
        itemTitleP.innerHTML = `${item.data.itemName}`;
        itemPriceP.innerHTML = `${item.data.itemCost}원`;
        userName.innerHTML = `${item.data.userName} ${selectLevelName(item.data.lvName)}`;
        manner.innerHTML = `매너 ${item.data.mannerScore}`;
        rgtDate.innerHTML = `${item.data.rgtDate}`;
        etc.innerHTML = etcContent;
        itemContentP.innerHTML = `${item.data.content}`;
        itemImgWrap.innerHTML = `${photoFilePath}`;
        heartClick.innerHTML = `${likeState}`;
        likeCnt.innerHTML = `${item.data.likeCount}`;

        replyFetch(no);
    })
})

};

function replyFetch(no) {
    fetch(`/market/getReply?no=${no}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(replies) {
       
        for (let reply of replies.data) {
            console.log(reply);
            // if (item.data.userId == loginUser.data.userId) {
                
            // }

            let div = document.createElement("div");
            div.setAttribute('class', 'd-flex my-3');
            
            div.innerHTML = 
            `
                <div><img src="../asset/image/user-img.jpg"></div>
                <div class="ps-2">
                    <div class="fw-bold">${reply.userName}</div>
                    <div>${reply.content}</div>
                    <div style="color: rgb(190, 190, 190)">${reply.rgtDate}</div>
                </div>
                <div class="ms-auto"><img src="../asset/image/menu.png"></div>
            `
            replyView.appendChild(div);
        }
    })
}

$("#menu").on("click", function() {
    console.log("메뉴 눌림!");
    console.log($("#menu").val());
})

function getLikeCnt() {
    fetch(`/market/get?no=${no}`)
    .then(function(response){
        return response.json();
    })
    .then(function(item){
        if (item.status == "fail") {
        window.alert("서버 요청 오류!");
        return;
        }
        likeCnt.innerHTML = `${item.data.likeCount}`
    });
}

function transState1(state) {
    switch (state) {
      case "S" : return "판매중";
      case "R" : return `예약중`;
      case "E" : return `거래완료`;
    }
}

function selectLevelName(levelName) {
    switch (levelName) {
        case "D" : return `<span class="badge bg-secondary">DEVELOPMENT</span>`;
        case "B" : return `<span class="badge bg-success">BEGINNER</span>`;
        case "I" : return `<span class="badge bg-warning text-dark">INTERMEDIATE</span>`;
        case "A" : return `<span class="badge bg-primary">ADVANCED</span>`;
        case "P" : return `<span class="badge bg-danger">PRO</span>`;
      }
}

function deleteItem(no) {
    fetch(`/market/delete?no=${no}`)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        if (result.status == "fail") {
        window.alert("서버 요청 오류!");
        return;
        }
        window.alert("삭제완료!");
        location.href = "marketMain.html";
    });
}

const loginUser = await getLoginUser();