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

getListSM();


function getListSM() {
    $.getJSON("/rsv/match/get", function (result) {
        let arr = result.data
        let matchId;
        let str = "";
        if (arr.length == 0) {
            str += `<div class="list-group-item d-flex w-100 justify-content-center align-items-center p-5">
                    예약 내역이 존재하지 않습니다.
            </div>`;
            $(".match-rsv-list").html(str);
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i].matchId)
            matchId = arr[i].matchId;
            $.getJSON(`/match/get?matchId=${matchId}`, function (result) {
                var match = result.data;
                str += `
      <li class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <div>
          <div class="d-flex justify-content-start align-items-center">
            <div class="ms-5">
              <p id="match-date" class="mb-1">${getFullYmdStr(match.matchDate)} ${match.startTime.slice(0, 5)}</p>
              <h6 id="field-court-name" class="mb-1">${match.court.field.name} ${match.court.name}</h6>
              <p id="field-addr" class="mb-1">${match.court.field.addr}</p>
              <p id="match-detail" class="text-muted match-info">
              ${checkMatchType(match.matchTypeNo)} · ${checkNumOfPeople(match.numOfPeople)} · ${checkCourtType(match.court.courtTypeNo)} · ${checkLevel(match.levelNo)}</p>
            </div>
          </div>
        </div>
        <div id="pay-date" class="text-center align-items-center text-muted">
          <p id="">결제일시 ${(arr[i].date).replace(/-/g, '.')}</p>
          <p id="">${checkRsvState(arr[i].state)}</p>
        </div>
      </div>
      </li>
      `;
                // console.log('str = ' + str)
                $(".match-rsv-list").html(str);
            })
        }
        // console.log('str = ' + str)
        // $(".match-rsv-list").html(str);
    })
}


function getFullYmdStr(date) {
    let d = new Date(date);
    return d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일 " + '일월화수목금토'.charAt(d.getUTCDay()) + '요일';
}

function checkMatchType(matchTypeNo) {
    switch (matchTypeNo) {
        case 1:
            return "남자";
        case 2:
            return "여자";
        case 3:
            return "혼성";
    }
}

function checkNumOfPeople(numOfPeople) {
    switch (numOfPeople) {
        case "S":
            return "1vs1";
        case "D":
            return "2vs2";
    }
}

function checkLevel(level) {
    switch (level) {
        case 1:
            return "모든 레벨";
        case 2:
            return "BEGINNER";
        case 3:
            return "INTERMEDIATE";
        case 4:
            return "ADVANCED";
        case 5:
            return "PRO";
    }
}

function checkCourtType(courtTypeNo) {
    switch (courtTypeNo) {
        case 1:
            return "하드";
        case 2:
            return "클레이";
        case 3:
            return "잔디";
        case 4:
            return "앙투카";
    }
}

function checkRsvState(state) {
    switch (state) {
        case "P":
            return "결제 완료";
        case "U":
            return "이용 완료";
        case "C":
            return "취소 완료";
    }
}


// =====================================
//             코트 예약 리스트
// =====================================

$('#court-rsv').on('click', function (e) {
    fetch('/rsv/court/getList').then(function (res) {
        return res.json();
    }).then(function (result) {
        let lists = result.data;
        console.log(lists);

        let str = "";
        if (lists.length == 0) {
            str = `<div class="list-group-item d-flex w-100 justify-content-center align-items-center p-5">
                    예약 내역이 존재하지 않습니다.
            </div>`;
            $(".match-rsv-list").html(str);
            return;
        }

        for (let i = 0; i < lists.length; i++) {
            let date = getFullYmdStr(dateFormat(lists[i].dateTime));
            let time = lists[i].dateTime.slice(-2);

            str += `
                <li class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between align-items-center">
                        <div>
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="ms-5">
                                    <p id="match-date" class="mb-1">${date} ${time}:00</p>
                                    <h6 id="field-court-name" class="mb-1">${lists[i].name} 코트 ${lists[i].courtId}</h6>
                                    <p id="field-addr" class="mb-1">${lists[i].addr}</p>
                                </div>
                            </div>
                        </div>
                        <div id="pay-date" class="text-center align-items-center text-muted">
                            <p>결제일시 ${lists[i].rgtDate}</p>
                            <p>${checkRsvState(lists[i].state)}</p>
                        </div>
                    </div>
                </li>`;
        }
        $(".match-rsv-list").html(str);
    });
});




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

