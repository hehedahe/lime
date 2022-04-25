"use strict"

import { selectCity } from '../common/selectCity.js'



$('#region').on('change', function(e) {
    console.log("-----------------")
    console.log(e.value)
    console.log("-----------------")
  selectCity(e.target.value);
})
