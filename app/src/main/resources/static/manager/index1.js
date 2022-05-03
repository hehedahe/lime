import {getLoginUser, getMtchList} from "../common/apiList.js";
import {levelTag, checkLevel, getFullYmdStr, checkMatchType, checkNumOfPeople} from "../common/typeCheck.js";

// 로그아웃
$('#signout-btn').on('click', function () {
    fetch("/member/signout").then(function (response) {
        location.href = "/social-match/index.html"
    });
});


let managerId; // 매니저 userId


(async function () {
    // user정보 가져오기
    const res = await getLoginUser();
    managerId = res.data.userId;

    // 매니저 소셜매치 리스트 가져오기
    let res2 = await getMtchList(managerId);

    let str = '';

    // 매치 리스트
    res2?.map((m) => {
        str += `
              <li class="list-group-item list-group-item-action mt-3" data-id=${m.mtchId} id="match">
                  <div class="d-flex w-100 justify-content-between align-items-center">
                        <div>
                              <div class="d-flex justify-content-start align-items-center">
                                    <div class="ms-5">
                                          <p id="match-date" class="mb-1">${getFullYmdStr(m.mtchDate)} ${m.stTime.slice(0, 5)}</p>
                                          <h6 id="field-court-name" class="mb-1">${m.field} ${m.court}</h6>
                                          <p id="match-detail" class="text-muted match-info">
                                              ${checkMatchType(m.mtchType)} · ${checkNumOfPeople(m.mtchNum)} · ${m.courtType} 타입 · ${levelTag(m.lvId)}
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
              </li>
        `;
    })

    $('.match-rsv-list').html(str);
})();


// 매치 상세 페이지로 이동
$(document).on('click', '#match', function (e) {
    location.href = `/manager/index2.html?matchId=${$(this).attr('data-id')}`;
})
