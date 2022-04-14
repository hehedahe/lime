"use strict"

import {selectCity} from '../common/selectCity.js'

const dropRegion = $("#drop-region")
const infoBtn = $('.info-btn')
const dropCity = $('#drop-city')

dropRegion.on('change', function (e) {
    selectCity(dropRegion.val());
});

// infoBtn.on('click', function (e){
//     e.preventDefault()
//     e.stopPropagation()
//     console.log(dropCity.val());
// })


