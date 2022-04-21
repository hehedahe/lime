"use strict";

$(".nav-tabs").on("click", (e) => {
    // console.log(e.target.getAttribute("date"))
    $(".nav-link.active").removeClass("active");
    $(e.target).addClass("active");
    // $(e.target).closest("li").addClass("active");
    // let matchDate = e.target.getAttribute("date")
    // let matchDate = $(e.target).closest("a").attr("date");
    // makeMatchList(
    //   `http://localhost:8080/match/list?matchDate=${matchDate}`
    // );
  });