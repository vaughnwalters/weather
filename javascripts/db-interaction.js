"use strict";

let $ = require('jquery');

function addForecast(forecastObj) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: "https://weather-ed863.firebaseio.com/weather.json",
      type: "POST",
      data: JSON.stringify(forecastObj),
      dataType: "json",
    }).done(function(songId){
      resolve(songId)
    });  
  });
}

module.exports = addForecast;