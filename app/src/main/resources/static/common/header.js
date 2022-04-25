"use strict"

fetch('/member/getLoginUser').then(function (response) {
    return response.json();
}).then(function (result) {

    if (result.status == "success") {
        $('#u-nav-links').html(`
            <div id="u-links-cal">
                <a href="/social-match/rsv.html">
                    <img src="/asset/image/header/calendar.png" height="30px" width="30px">
                </a>
            </div>
            <div id="u-links-msg">
                <img src="/asset/image/header/msg2.png" height="30px" width="30px">
            </div>
            <div class="btn-group dropend">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><img src="../header/userImg.png" height="30px" width="30px"/>
                     Dropend
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">마이페이지</a></li>
                    <li><a class="dropdown-item" href="#">나의활동</a></li>
                    <li><a class="dropdown-item" href="#">찜목록</a></li>
                    <li><a class="dropdown-item" href="#">로그아웃</a></li>
                </ul>
            </div>
        `)
        $('#logoutBtn').on('click', function() {
            fetch("/member/signout").then(function(response) {
                $('#u-nav-links').html(`
                <li><a href="/login/login.html">로그인</a></li>
                <li><a href="#">|</a></li>
                <li><a href="/signup/signup1.html">회원가입</a></li>`)
            });
        });
    }
});



.btn-secondary {
    /* color: #fff; */
    /* background-color: #6c757d; */
    /* border-color: #6c757d; */
}