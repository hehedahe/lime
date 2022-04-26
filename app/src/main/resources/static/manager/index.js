
$('.team-btn').on('click', function (e) {

    if ($(e.target).hasClass('btn-outline-danger')) {
        $(e.target).removeClass('btn-outline-danger').addClass('btn-danger');
        $(e.target).siblings().removeClass('btn-warning').addClass('btn-outline-warning');

    } else if ($(e.target).hasClass('btn-outline-warning')) {
        $(e.target).removeClass('btn-outline-warning').addClass('btn-warning');
        $(e.target).siblings().removeClass('btn-danger').addClass('btn-outline-danger');

    }
})