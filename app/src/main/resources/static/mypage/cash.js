"use strict"

$(".nav-tabs").on("click", (e) => {
    // console.log(e.target.getAttribute("date"))
    $(".nav-link.active").removeClass("active");
    $(e.target).addClass("active");
    // $(e.target).closest("li").addClass("active");
    // let matchDate = e.target.getAttribute("date")
    // let matchDate = $(e.target).closest("a").attr("date");
    // makeMatchList(
    //   `http://localhost:8080/match/list?matchDate=${matchDate}`
    // );
});

$.getJSON("/member/getLoginUser", (result) => {
    console.log(result.status);
    console.log("user::::::::::::::", result.data);
    if (result.status == "fail") {
        location.href = `/login/login.html`
    }
    console.log(result.data.no);
})

const xBalance = $("#balance span");

$.getJSON("/rsv/match/balance", function (result) {
    console.log(result);
    let userInfo = result.data;
    xBalance.text(`${(userInfo.sum).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`)
  })

$.getJSON("/limecash/get", function (result) {
    console.log(result.status);
    if (result.status == "fail") {
        window.alert("서버 요청 오류!");
        console.log(result.data);
        return;
    }
    let lcList = result.data;
    let str = "";
    if (lcList.length == 0) {
        str += `
        <div class="list-group-item d-flex w-100 justify-content-center align-items-center p-5">
            충전 및 사용 내역이 존재하지 않습니다.
        </div>`;
        $("#lclist").html(str);
        return;
    }
    for (let i = 0; i < lcList.length; i++) {
        let textcolor = '';
        let plusMinus = '';
        let markText = '';
        let classMark = '';
        if (lcList[i].typeUse == 'C') {
            textcolor = 'charge-cash';
            plusMinus = '+';
            markText = '충전';
            classMark = 'charge-mark';
        } else {
            textcolor = 'use-cash';
            plusMinus = '-';
            markText = '사용';
            classMark = 'use-mark';
        }
        str += `
        <li class="list-group-item list-group-item-action">
        <div class="d-flex w-100 h-100 justify-content-between align-items-center">
            <div>
                <div class="d-flex justify-content-start align-items-center">
                    <div class="charge-mark d-flex align-items-center justify-content-center ${classMark}">${markText}</div>
                    <div class="ms-5">
                        <p class="pay-date mb-1">${lcList[i].myDate.replace(/-/g, '.')}</p>
                        <h6 id="field-court-name">${checkChargeUse(lcList[i].typeUse)}</h6>
                        <span class="pay-date">${checkUsed(lcList[i].used)}</span>
                    </div>
                </div>
            </div>
            <div id="pay-date" class="text-center align-items-center text-muted">
                <p class="${textcolor}">${plusMinus}${(lcList[i].amt).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</p>
            </div>
        </div>
    </li>
    `
    }
    $("#lclist").html(str);
})

function checkChargeUse(typeUse) {
    switch (typeUse) {        
        case "C":
            return "캐시 충전";
        case "U":
            return "캐시 사용";
    }
}

function checkUsed(used) {
    switch (used) {
        case "C":
            return "코트 예약";
        case "M":
            return "소셜 매치";
        default:
            return "";
    }
}


// // =====================================
// //             코트 예약 리스트
// // =====================================

// $('#court-rsv').on('click', function (e) {
//     fetch('/rsv/court/getList').then(function (res) {
//         return res.json();
//     }).then(function (result) {
//         let lists = result.data;
//         console.log(lists);

//         let str = "";
//         if (lists.length == 0) {
//             str = `<div class="list-group-item d-flex w-100 justify-content-center align-items-center p-5">
//                     예약 내역이 존재하지 않습니다.
//             </div>`;
//             $(".match-rsv-list").html(str);
//             return;
//         }

//         for (let i = 0; i < lists.length; i++) {
//             let date = getFullYmdStr(dateFormat(lists[i].dateTime));
//             let time = lists[i].dateTime.slice(-2);

//             str += `
//                 <li class="list-group-item list-group-item-action">
//                     <div class="d-flex w-100 justify-content-between align-items-center">
//                         <div>
//                             <div class="d-flex justify-content-start align-items-center">
//                                 <div class="ms-5">
//                                     <p id="match-date" class="mb-1">${date} ${time}:00</p>
//                                     <h6 id="field-court-name" class="mb-1">${lists[i].name} 코트 ${lists[i].courtId}</h6>
//                                     <p id="field-addr" class="mb-1">${lists[i].addr}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div id="pay-date" class="text-center align-items-center text-muted">
//                             <p>결제일시 ${lists[i].rgtDate}</p>
//                             <p>${checkRsvState(lists[i].state)}</p>
//                         </div>
//                     </div>
//                 </li>`;
//         }
//         $(".match-rsv-list").html(str);
//     });
// });




// =====================================
//            소셜매치 예약 리스트
// =====================================
$('#social-match').on('click', function (e) {
    getListSM();
})




// =====================================
//           yy-mm-dd 형태로 변환
// =====================================
function dateFormat(dateTime) {
    let year = "20" + dateTime.slice(0, 2);
    let month = dateTime.slice(2, 4);
    let date = dateTime.slice(4, 6);

    return `${year}-${month}-${date}`;
}

