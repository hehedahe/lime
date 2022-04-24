"use strict"

import { textAreaAutoSizing } from '../common/textAreaAutoSizing.js';


    textAreaAutoSizing();

  var itemBox = document.querySelector("#item-box");
  var replyBox = document.querySelector("#reply-box");
  var itemImageWrap = document.querySelector("#item-img-wrap");

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
  //getPhoto();

function itemViewFetch() {
    fetch(`/market/get?no=${no}`)
    .then(function(response){
        return response.json();
    })
    .then(function(item){
        if (item.status == "fail") {
        window.alert("서버 요청 오류!");
        return;
        }

        let levelName = item.data.lvName;
        if (levelName == "D") {
            levelName = `<span class="badge bg-secondary">DEVELOPMENT</span>`;
        }
        else if (levelName == "B") {
            levelName = `<span class="badge bg-success">BEGINNER</span>`;
        }
        else if (levelName == "I") {
            levelName = `<span class="badge bg-warning text-dark">INTERMEDIATE</span>`;
        }
        else if (levelName == "A") {
            levelName = `<span class="badge bg-primary">ADVANCED</span>`;
        }
        else if (levelName == "P") {
            levelName = `<span class="badge bg-danger">PRO</span>`;
        }

        let photoFilePath ="";
        for (let photo of item.data.photo) {
            photoFilePath += `<div class="photo-wrap"><img src="/market/photo?filename=${photo.filePath}&type=view"></div>`;
            console.log(photoFilePath);
        }
        
        console.log(item.data);
        
        itemBox.innerHTML = `<div id="item-region"><p>${item.data.regionName} ${item.data.cityName}</p></div>
                <div id="item-title"><p>${item.data.itemName}</p></div>
                <div id="item-price"><p>${item.data.itemCost}원</p></div>
                <div id="user-info">
                    <div class="container g-0">
                        <div class="row g-0">
                            <div id="user-img-wrap"><img src="../asset/image/user-img.jpg"></div>
                            <div class="col-sm-8">
                                <div class="container">
                                    <div class="row">
                                        <div class="col"><span id="user-name">${item.data.userName}</span> ${levelName} <span id="manner">매너 ${item.data.mannerScore}</span></div>
                                    </div>
                                    <div class="row">
                                        <div class="col">${item.data.rgtDate}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <button id="ask" type="button">
                                구매 문의하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="item-content"><p>${item.data.content}</p></div>
                <div id="item-img-wrap">${photoFilePath}</div>
                <div id="heart-wrap">
                    <a class="heart-click" idx=${item.data.itemId}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(146, 219, 130)" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg></a>
                </div>`
        replyBox.innerHTML = `<div id="reply-wrap">
                                <p>댓글</p>
                                <div id="reply-view">댓글 달리는 곳</div>
                                <div class="container">
                                    <div class="row">
                                        <div class="col g-0"><img src="../asset/image/user-img.jpg"></div>
                                        <div id="reply-form" class="col-11">
                                            <textarea class="autosize" placeholder="댓글을 남겨보세요" style="overflow: hidden;"></textarea>
                                            <button id="reply-btn" type="button">등록</button>
                                        </div>
                                    </div>
                                </div>
                              </div>`
             
    })
}

function getPhoto() {
    fetch(`/market/getPhoto?no=${no}`)
    .then(function(response){
        return response.json();
    })
    .then(function(item){
        if (item.status == "fail") {
        window.alert("서버 요청 오류!");
        return;
        }
        console.log(item);
        for (let list of item.data) {
            console.log(list.filePath);
            let photo = "/market/photo?filename=" + list.filePath;
            console.log(photo);
            itemBox.innerHTML = `<div id="item-img-wrap"><img src=${photo}></div>`;
        }
        
    })
}