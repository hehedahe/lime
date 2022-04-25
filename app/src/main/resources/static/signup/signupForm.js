"use strict"

import { selectCity } from '../common/selectCity.js'



$('#region').on('change', function(e) {

  selectCity(e.target.value);
})




