"use strict";

// var myModal = document.getElementById('chargeModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })

// $("input[name=flexRadioDefault]")

// let aa = $('input[name="chargeAmount"]:checked').val()

// console.log(aa)

// $(".form-check").on("change", function (e) {
// console.log($(this).val())
// })

// $(".date-li a").on("click", (e) => {
//     // console.log(e.target.getAttribute("date"))
//     $(".date-li.active").removeClass("active");
//     $(e.target).closest("li").addClass("active");
//     // let matchDate = e.target.getAttribute("date")
//     let matchDate = $(e.target).closest("a").attr("date");
//     makeMatchList(
//         `http://localhost:8080/match/list?matchDate=${matchDate}`
//     );
// });

// $(document).ready(function (e) {
//     var radioVal = $('input[name="radioTxt"]:checked').val();
//     console.log(radioVal);
// })

// var amount = $('input[name=chargeAmount]:checked').val()

// var amount = $('#selectAmount input:radio:checked').val()

// var amount = $('input:radio[name="chargeAmount"]:checked').siblings("label").text()

var amount = $('input:radio[name="chargeAmount"]:checked').next().text()

console.log(amount)

$(".form-check-input").on("click", function (e) {
    var v = $('input:radio[name="chargeAmount"]:checked').next().text()
    console.log(v);
})

var payMethod = $('input:radio[name="paymentMethod"]:checked').next().text()

console.log(payMethod)

$(".form-check-input").on("click", function (e) {
    var v = $('input:radio[name="paymentMethod"]:checked').next().text()
    console.log(v);
})

$("#pay-btn").on("click", function (e) {
    if (!($('#agreement1').is(':checked')) && ($('#agreement2').is(':checked'))) {
        window.alert("구매 조건 및 정보 제공 등에 동의해 주세요.");
        return;
    }
})

