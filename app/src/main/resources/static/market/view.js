"use strict"

import { textAreaAutoSizing } from '../common/textAreaAutoSizing.js';
import { getLoginUser } from '../common/apiList.js';

$(document).ready(function(e){

    fetch(`/member/getLoginUser`)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
            
    // 좋아요 버튼
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
            getLikeCnt();
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
            getLikeCnt();
            });

            $(this).children("svg").toggleClass("bi-heart");
            $(this).html(`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(146, 219, 130)" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>`)

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

    // 중고 글 삭제
    $(document).on("click", "#i-delete", function() {
        console.log("삭제!");
        console.log($(this).attr("idx"));
        deleteItem($(this).attr("idx"));
    });

    // 댓글 수정하기 버튼
    $(document).on("click", "#r-update", function(e) {
        console.log($(this).attr('idx'));
        const index = $(this).attr('idx');
        $(`textarea[idx=${index}]`).attr('readonly', false);
        $(`div[index=${index}]`)
        .css('border', '1px solid rgb(234, 235, 239)')
        .css('border-radius', '5px')
        .css('padding', '3px 3px');

        
        $(`button[idx=${index}]`).css('display','');
        
    });

    // 댓글 수정 취소
    $(document).on("click", "#r-cancel-btn", function() {
        console.log("취소");
        const index = $(this).attr('idx');
        $(`textarea[idx=${index}]`).attr('readonly', true);
        $(`div[index=${index}]`)
        .css('border', 'none')
        .css('padding', '3px 3px');

        $(`button[idx=${index}]`).css('display','none');
    });

    // 댓글 수정 완료
    $(document).on("click", "#r-complete-btn", function() {
        const index = $(this).attr('idx');
        $(`textarea[idx=${index}]`).attr('readonly', true);
        $(`div[index=${index}]`)
        .css('border', 'none')
        .css('padding', '3px 3px');

        $(`button[idx=${index}]`).css('display','none');

        updateReply(index);
    });

    // 댓글 삭제
    $(document).on("click", "#r-delete", function() {
        deleteReply($(this).attr("idx"));
    });

    // 댓글 추가
    $(document).on("click", "#reply-btn", function() {
        if (replyText.value != "") {
            if (loginUser.data.userId != null) {
                addReply(no, $("#user-name").attr('idx'));
            } else {
                alert("로그인 후 이용해주세요.");
            }
        } else {
            alert("내용을 입력해주세요.");
        }
    });
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
  var rTextWrap = document.querySelector("#r-text-wrap");
  var replyView = document.querySelector("#reply-view");
  var replyForm = document.querySelector("#reply-form");
  var replyText = document.querySelector("#reply-text");

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

        let arr = item.data.content.split("\n");
        const areaHeight = 28 * arr.length;
        $("#item-content-p").css('height', `${areaHeight}px`);
        
        replyForm.setAttribute('name', 'itemId');
        $("#reply-form").val(no);

        $("#user-name").attr('idx',`${item.data.userId}`);

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
        itemContentP.value = `${item.data.content}`;
        itemImgWrap.innerHTML = `${photoFilePath}`;
        heartClick.innerHTML = `${likeState}`;
        likeCnt.innerHTML = `${item.data.likeCount}`;

        replyFetch(no, item.data.userId);
    })
})

};

function replyFetch(no, writerNo) {
    fetch(`/market/getReply?no=${no}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(replies) {
        for (let reply of replies.data) {
            console.log(reply);
            console.log(reply.content);
            let arr = reply.content.split("\n");
            console.log(arr.length);
            const areaHeight = 28 * arr.length;

            let div = document.createElement("div");
            div.setAttribute('class', 'd-flex my-3');
            div.setAttribute('name', 'reply');
            div.setAttribute('idx', `${reply.replyId}`);

            if (reply.userId == writerNo) {
                if (reply.userId == loginUser.data.userId) {
                    div.innerHTML = 
                    `
                        <div><img src="../asset/image/user-img.jpg"></div>
                        <div class="ps-2">
                            <div class="fw-bold col-11">${reply.userName} <span id="writer-badge">판매자</span> <span id="me-badge">나</span></div>
                            <div id="r-text-wrap" class="d-flex align-items-end" index=${reply.replyId}>
                                <textarea id="r-text" name="replyId" class="autosize pt-1" idx=${reply.replyId} readonly style="overflow: hidden; height: ${areaHeight}px;">${reply.content}</textarea>
                                <button id="r-cancel-btn" class="mx-1" type="button" style="display: none;" idx=${reply.replyId}>취소</button>
                                <button id="r-complete-btn" class="mx-1" type="button" style="display: none;" idx=${reply.replyId}>등록</button>
                            </div>
                            <div style="color: rgb(190, 190, 190)">${reply.rgtDate}</div>
                        </div>
                        <div class="ms-auto"><a class="nav-link my-1" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" ><img src="../asset/image/menu.png"></a>
                            <ul class="dropdown-menu">
                            <li><a class="dropdown-item" id="r-update" idx=${reply.replyId}>수정하기</a></li>
                            <li><a class="dropdown-item" id="r-delete" idx=${reply.replyId}>삭제하기</a></li>
                            </ul>
                        </div>
                    `
                } else {
                    div.innerHTML = 
                `
                    <div><img src="../asset/image/user-img.jpg"></div>
                    <div class="ps-2">
                        <div class="fw-bold col-11">${reply.userName} <span id="writer-badge">판매자</span></div>
                        <div id="r-text-wrap" class="d-flex" index=${reply.replyId}>
                            <textarea id="r-text" name="replyId" class="autosize pt-1" idx=${reply.replyId} readonly style="overflow: hidden; height: ${areaHeight}px;">${reply.content}</textarea>
                        </div>
                        <div style="color: rgb(190, 190, 190)">${reply.rgtDate}</div>
                        
                    </div>
                    <div class="ms-auto"><a class="nav-link my-1" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" ><img src="../asset/image/menu.png"></a>
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">신고하기</a></li>
                        </ul>
                    </div>
                `
                }
            } else {
                if (reply.userId == loginUser.data.userId) {
                    div.innerHTML = 
                    `
                        <div><img src="../asset/image/user-img.jpg"></div>
                        <div class="ps-2">
                            <div class="fw-bold col-11">${reply.userName} <span id="me-badge">나</span></div>
                            <div id="r-text-wrap" class="d-flex align-items-end" index=${reply.replyId}>
                                <textarea id="r-text" name="replyId" class="autosize pt-1" idx=${reply.replyId} readonly style="overflow: hidden; height: ${areaHeight}px;">${reply.content}</textarea>
                                <button id="r-cancel-btn" class="mx-1" type="button" style="display: none;" idx=${reply.replyId}>취소</button>
                                <button id="r-complete-btn" class="mx-1" type="button" style="display: none;" idx=${reply.replyId}>등록</button>
                            </div>
                            <div style="color: rgb(190, 190, 190)">${reply.rgtDate}</div>
                        </div>
                        <div class="ms-auto"><a class="nav-link my-1" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" ><img src="../asset/image/menu.png"></a>
                            <ul class="dropdown-menu">
                            <li><a class="dropdown-item" id="r-update" idx=${reply.replyId}>수정하기</a></li>
                            <li><a class="dropdown-item" id="r-delete" idx=${reply.replyId}>삭제하기</a></li>
                            </ul>
                        </div>
                    `
                } else {
                    div.innerHTML = 
                `
                    <div><img src="../asset/image/user-img.jpg"></div>
                    <div class="ps-2">
                        <div class="fw-bold col-11">${reply.userName}</div>
                        <div id="r-text-wrap" class="d-flex" index=${reply.replyId}>
                            <textarea id="r-text" name="replyId" class="autosize pt-1" idx=${reply.replyId} readonly style="overflow: hidden; height: ${areaHeight}px;">${reply.content}</textarea>
                        </div>
                        <div style="color: rgb(190, 190, 190)">${reply.rgtDate}</div>
                        
                    </div>
                    <div class="ms-auto"><a class="nav-link my-1" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" ><img src="../asset/image/menu.png"></a>
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">신고하기</a></li>
                        </ul>
                    </div>
                `
                }
            }
            
            replyView.appendChild(div);
        }
    })
    
};

function addReply(no, writerNo) {
    
    let params = new URLSearchParams();
    //replyForm.setAttribute('name', 'itemId');
    const name = $("#reply-form").attr("name");
    const value = replyForm.value;

    params.set(name, value);
    params.set('content', $("#reply-text").val());

    fetch(`/market/addReply?`, {
        method : "POST",
        body : params
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        if (result.status == "fail") {
            alert("등록하지 못했습니다.");
            return;
        }

        $("div[name=reply]").remove();
        replyFetch(no, writerNo);
        replyText.value = "";
    });
};

function updateReply(no) {
    let params = new URLSearchParams();
    
    params.set('replyId', no);
    params.set('content', $(`textarea[idx=${no}]`).val());

    fetch(`/market/updateReply`, {
        method : "POST",
        body : params
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        if (result.status == "fail") {
            alert("권한이 없습니다!");
            return;
        }
    });
}

function deleteReply(no) {

    fetch(`/market/deleteReply?no=${no}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        if (result.status == "fail") {
            alert("권한이 없습니다!");
            return;
        }
    });
    $(`div[idx=${no}]`).remove();
};

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
        // window.alert("삭제 완료!");
        location.href = "marketMain.html";
    });
}

const loginUser = await getLoginUser();