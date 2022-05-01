"use strict"

fetch('/member/getLoginUser').then(function (response) {
    return response.json();
}).then(function (result) {
	var userInfo = '';
	console.log(result)	
    if (result.status == "success") {
        $('#u-nav-links').html(`
            <div id="u-links-cal">
                <a href="/social-match/rsv.html">
                    <img src="/asset/image/header/calendar.png" height="30px" width="30px">
                </a>
            </div>
            <div id="u-links-msg">
                <a href="/chatting/chattingList.html?name=${result.data.name}"><img src="/asset/image/header/msg2.png" height="30px" width="30px"></a>
            </div>
            <div class="btn-group dropdown">
                <button id="prof-img" type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false"><img src="../header/userImg.png" height="30px" width="30px"/>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/mypage/index.html">마이페이지</a></li>
                    <li><a class="dropdown-item" href="#">나의 활동</a></li>
                    <li><a class="dropdown-item" href="../market/wishList.html">찜목록</a></li>
                    <li><a class="dropdown-item" href="#"style="color: red;" id="logoutBtn">로그아웃</a></li>
                </ul>
            </div>
        `)
        $('#logoutBtn').on('click', function() {
            fetch("/member/signout").then(function(response) {
                $('#u-nav-links').html(`
                <li><a href="/login/login.html">로그인</a></li>
                <li><a href="#">|</a></li>
                <li><a href="/signup/signup1.html">회원가입</a></li>`)
                location.href = "/social-match/index.html"
            });
        });
    }
});

