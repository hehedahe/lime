"use strict";

$(document).ready(function () {
    var today = new Date();
    var date = today.getDate();

    // console.log(today);

    for (let i = 0; i < 14; i++) {
        // console.log(date + i)
        var year = today.getFullYear();
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var day = ("0" + today.getDate()).slice(-2);
        var dateString = year + "-" + month + "-" + day;
        $(`#date-${i}`).html(`${day}<p id="${day - i}">${getDay(dateString)}</p>`);
        if (getDay(dateString) === "토") {
            $(`#date-${i}`).closest("li").addClass("sat");
        } else if (getDay(dateString) === "일") {
            $(`#date-${i}`).closest("li").addClass("sun");
        }
        // console.log(dateString)
        $(`#date-${i}`).attr("date", `${dateString}`);
        // $(`#date-${i}`).attr("href", `http://localhost:8080/match/list?matchDate=${dateString}`)
        today.setDate(today.getDate() + 1);
    }

    let matchDate = $("#date-0").attr("date");
    makeMatchList(
        `http://localhost:8080/match/list?matchDate=${matchDate}`
    );
});

function getDay(date) {
    let today = new Date(date);
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    let day = week[today.getDay()];
    return day;
}

function makeMatchList(url) {
    $.getJSON(url, function (arr) {
        console.log(arr);
        let str = "";
        if (arr.length == 0) {
            str += `<div class="list-group-item d-flex w-100 justify-content-center align-items-center p-5">오늘 매치는 마감되었습니다.</div>`;
            $(".match-list").html(str);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            let state = "";
            let aaa = "";
            if (arr[i].state === "A") {
                state = "신청 가능";
            } else {
                state = "마감";
                aaa = "closed-btn";
            }
            str += `
                      <a href="/social-match/detail.html?matchId=${arr[i].matchId}" class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between align-items-center">
                          <div>
                            <div class="d-flex justify-content-start align-items-center">
                              <div class="me-4 match-time">${arr[i].startTime.slice(
                                0,
                                5
                            )}</div>
                              <div class="ms-1">
                                <h6 class="mb-1">${arr[i].court.field.name} ${
                                arr[i].court.name
                            }</h6>
                                <p class="text-muted match-info">${checkMatchType(
                                arr[i].matchTypeNo
                            )} · ${checkNumOfPeople(
                                arr[i].numOfPeople
                            )} · ${checkCourtType(arr[i].court.courtTypeNo)} · ${checkLevel(
                                arr[i].levelNo
                            )}</p>
                              </div>
                            </div>
                          </div>
                          <button class="btn match-btn ${aaa}"
                                  onclick="location.href='/social-match/detail.html?matchId=${arr[i].matchId}'">
                            ${state}
                          </button>
                          </div>
                        </a>`;
                        }
        $(".match-list").html(str);
    });
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

var params = new URLSearchParams();
// console.log("params : " + params);

$(".form-select").on("change", function (e) {
    const name = $(e.target).attr("name");
    console.log(name);
    const value = e.target.value;
    console.log(value);

    if (value == 0) {
        params.delete(name);
    } else {
        params.set(name, value);
    }

    let matchDate = $(".active a").attr("date");
    console.log(matchDate);

    params.set("matchDate", matchDate);

    console.log("parameter : " + params);

    $.getJSON(
        `http://localhost:8080/match/list?${params}`,
        function (arr) {
            console.log(arr);
            const matchList = $(".match-list");
            let str = "";
            for (let i = 0; i < arr.length; i++) {
                let state = "";
                let aaa = "";
                if (arr[i].state === "A") {
                    state = "신청 가능";
                } else {
                    state = "마감";
                    aaa = "closed-btn";
                }
                str += `
      <a href="/social-match/detail.html?matchId=${arr[i].matchId}" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <div>
            <div class="d-flex justify-content-start align-items-center">
              <div class="me-4 match-time">${arr[i].startTime.slice(
                    0,
                    5
                )}</div>
              <div class="ms-1">
                <h6 class="mb-1">${arr[i].court.field.name} ${
                    arr[i].court.name
                }</h6>
                <p class="text-muted match-info">${checkMatchType(
                    arr[i].matchTypeNo
                )} · ${checkNumOfPeople(
                    arr[i].numOfPeople
                )} · ${checkCourtType(arr[i].court.courtTypeNo)} · ${checkLevel(
                    arr[i].levelNo
                )}</p>
              </div>
            </div>
          </div>
          <button class="btn match-btn ${aaa}">${state}</button>
          </div>
        </a>`;
            }
            $(".match-list").html(str);
        }
    );
});

$("#next-btn").on("click", (e) => {
    $(".date-div")
        .css("transform", "translateX(-53.1%)")
        .css("transition", "all .5s");
    $("#next-btn").addClass("disabled");
    $("#prev-btn").removeClass("disabled");
});

$("#prev-btn").on("click", (e) => {
    $(".date-div")
        .css("transform", "translateX(0%)")
        .css("transition", "all .5s");
    $("#prev-btn").addClass("disabled");
    $("#next-btn").removeClass("disabled");
});

$(".date-li a").on("click", (e) => {
    // console.log(e.target.getAttribute("date"))
    $(".date-li.active").removeClass("active");
    $(e.target).closest("li").addClass("active");
    // let matchDate = e.target.getAttribute("date")
    let matchDate = $(e.target).closest("a").attr("date");
    makeMatchList(
        `http://localhost:8080/match/list?matchDate=${matchDate}`
    );
});