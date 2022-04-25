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
            <div id="u-links-user">
<!--            <button id=logoutBtn onclick="test()">버튼</button>-->
<!--                <div id="myDropdown" class="dropdown-content">-->
<!--                    <a href="#">Link 1</a>-->
<!--                    <a href="#">Link 2</a>-->
<!--                    <a href="#">Link 3</a>-->
<!--                </div> -->
<!--                <img src="../asset/image/user2b.png" height="30px" width="30px">-->
            </div>
        `)
    }
});


window.addEventListener('load', function() {
    // alert("okokok")
    const logoutBtn = this.document.querySelector(".logoutBtn")
    console.log(logoutBtn)
})

//$(document).on('click', )


document.addEventListener('DOMContentLoaded', function() {
    alert("okok2")


    const logoutBtn = document.querySelector(".logoutBtn")
    console.log(logoutBtn)
    
 }, false);


// window.onload = function() {
//     alert(:)
// }


 function test() {
     const h1Tag = document.createElement("h1")
     const hihi = document.createTextNode('Hi!')

     h1Tag.appendChild(hihi)

     document.this.appendChild(h1Tag)
 }


