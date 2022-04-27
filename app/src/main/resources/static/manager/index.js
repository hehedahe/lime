
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
})

// =====================================
//             RED팀 YELLOW팀 CSS
// =====================================
$('.team-btn').on('click', function (e) {
    if ($(e.target).hasClass('btn-outline-danger'))  {
        $(e.target).removeClass('btn-outline-danger').addClass('btn-danger');
        $(e.target).siblings().removeClass('btn-warning').addClass('btn-outline-warning');

        $('.red-team').append(`
            <div class="col d-flex m-3 align-items-center">
                <div>🥎</div>
                <div class="mx-2 fs-5">김라임1</div>
                <span class="badge bg-warning u-level">INTERMEDIATE</span>
                <button class="btn btn-secondary mx-2 eval-btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">평가</button>
            </div>
        `);
    } else if ($(e.target).hasClass('btn-outline-warning') && (($('.btn-warning').length) <= 2)) {
        $(e.target).removeClass('btn-outline-warning').addClass('btn-warning');
        $(e.target).siblings().removeClass('btn-danger').addClass('btn-outline-danger');

        $('.yellow-team').append(`
            <div class="col d-flex m-3 align-items-center">
                <div>🥎</div>
                <div class="mx-2 fs-5">이라임</div>
                <span class="badge bg-warning u-level">INTERMEDIATE</span>
                <button class="btn btn-secondary mx-2 eval-btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">평가</button>
            </div>
        `);
    }

    if (($('.btn-danger').length > 2) || ($('.btn-warning').length > 2)) {
        Toast.fire({
            icon: 'info',
            title: '한 팀당 과반수 이상이 참여할 수 없습니다.'
        });
    }
});




