"use strict";

$.getJSON("/member/getLoginUser", (result) => {
    console.log(result.status);
    if (result.status == "fail") {
      location.href = `/login/login.html`
    }
    // console.log(result.status);
  })

const xName = $("#user-name");
const xRegionHand = $("#user-region-hand");
const xClub = $("#user-club");
const xBalance = $("#balance");
const xLevel = $("#user-level");
const xManner = $("#user-manner");
const xMannerBar = $("#manner-bar");

$.getJSON("/rsv/match/balance", function (result) {
    console.log(result);
    let userInfo = result.data;
    xName.text(userInfo.name)
    xRegionHand.text(`${userInfo.region} | ${userInfo.hand}`);
    xClub.text(userInfo.club)
    xBalance.text(`${(userInfo.sum).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`)
    xLevel.text(`${checkLevel(userInfo.level)}`)
    xManner.text(`${userInfo.mannerScore} Point`)
    xMannerBar.attr('style', `width: ${userInfo.mannerScore}%`).attr('aria-valuenow', `${userInfo.mannerScore}`)
  })

  function checkLevel(courtTypeNo) {
    switch (courtTypeNo) {
        case 'D':
            return "DEVELOPMENT";
        case 'B':
            return "BEGINNER";
        case 'I':
            return "INTERMEDIATE";
        case 'A':
            return "ADVANCED";
        case 'P':
            return "PRO";
    }
}