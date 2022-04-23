"use strict"



export function getLogin(link) {
    fetch(`/member/getLoginUser`)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        if (result.status == "fail") {
            window.alert("로그인 후 이용해주세요.");
            return;
          }
          location.href = link;
    });
};