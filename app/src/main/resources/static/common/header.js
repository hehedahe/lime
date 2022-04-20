"use strict"

fetch('/member/getLoginUser').then(function (response) {
    return response.json();
}).then(function (result) {
    if (result.status == "success") {
        $('#u-nav-links').html(`
            <div id="u-links-cal">
                <img src="/asset/image/header/calendar.png" height="30px" width="30px">
            </div>
            <div id="u-links-msg">
                <img src="/asset/image/header/msg2.png" height="30px" width="30px">
            </div>
            <div id="u-links-user">
<!--                <img src="../asset/image/user2b.png" height="30px" width="30px">-->
            </div>
        `)
    }
});