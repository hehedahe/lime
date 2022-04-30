
import {signout, getMatchUsers, getLoginUser} from '../common/apiList.js'
import {levelTag, checkLevel} from '../common/typeCheck.js'




$('#signout-btn').on('click', async function (e) {
    const res = await signout();
    location.href = '/social-match/index.html';
});

// sweetalert
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});


let resp;
let users;

(async function () {

    resp = await getMatchUsers(209);
    users = resp.data.users

    console.log("users::::::::::::", users)

    users?.map((user) => {
        $('#user-list').append(`
            <div class="row mb-2 pb-2 border-bottom">
                <div class="col d-flex m-2 align-items-center">
                    <div>🥎</div>
                    <div class="mx-2 fs-5">${user.name}</div>
                    ${levelTag(user.lvId)}
                </div>
                <div class="d-grid gap-2 col-4 d-md-flex" data-info=${user.name}-${user.lvId}>
                    <button class="team-btn btn btn-outline-danger me-2 col w-50" type="button" value="red">RED팀</button>
                    <button class="team-btn btn btn-outline-warning col w-50" type="button" value="yellow">YELLOW팀</button>
                </div>
            </div>
        `);
    })
})();




// =====================================
//           RED팀, YELLOW팀 CSS
// =====================================
$(document).on('click', '.team-btn', async function (e) {

    let selectedName = $(e.target).parent().attr('data-info').split('-')[0];
    let selectedLvId = Number($(e.target).parent().attr('data-info').split('-')[1]);

    if ($(e.target).hasClass('btn-outline-danger'))  {
        $(e.target).removeClass('btn-outline-danger').addClass('btn-danger');
       if ($(e.target).siblings().hasClass('btn-warning')) {
           $(e.target).siblings().removeClass('btn-warning').addClass('btn-outline-warning');
           $(`div[value=${selectedName}`).remove();
       }

        $('.red-team').append(`
            <div class="col d-flex m-3 align-items-center" value=${selectedName}>
                <div>🥎</div>
                <div class="mx-2 fs-5">${selectedName}</div>
                ${levelTag(selectedLvId)}
                <button class="btn btn-secondary mx-2 eval-btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">평가</button>
            </div>
        `);

    } else if ($(e.target).hasClass('btn-outline-warning')) {
        $(e.target).removeClass('btn-outline-warning').addClass('btn-warning');
        if ($(e.target).siblings().hasClass('btn-danger')) {
            $(e.target).siblings().removeClass('btn-danger').addClass('btn-outline-danger');
            $(`div[value=${selectedName}`).remove();
        }

        $('.yellow-team').append(`
            <div class="col d-flex m-3 align-items-center" value=${selectedName}>
                <div>🥎</div>
                <div class="mx-2 fs-5">${selectedName}</div>
                ${levelTag(selectedLvId)}
                <button class="btn btn-secondary mx-2 eval-btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">평가</button>
            </div>
        `);
    }

    if (($('.btn-danger').length > (users.length / 2)) || ($('.btn-warning').length > (users.length / 2))) {
        Toast.fire({
            icon: 'info',
            title: '한 팀당 과반수 이상이 참여할 수 없습니다.'
        })
    };

});







