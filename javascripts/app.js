"use strict";

let $ = require('jquery'),
    api = require("./api"),
    zip = $("#zip");

// arg of jquery value of zip code grabbed from dom
// (would be api.getWeather(zip) if was exporting more than one function)
$("#weatherButton").click(function () {
  api(zip)
    // parse data to output to DOM
  .then(function (weather) {
    $("outputDiv").html("");
    console.log(weather.forecast.txt_forecast.forecastday[0].fcttext);
      var weatherDay = weather.forecast.txt_forecast.forecastday[0].title;
      var weatherNow = weather.forecast.txt_forecast.forecastday[0].fcttext;
      var icon = weather.forecast.txt_forecast.forecastday[0].icon_url;
    $("#outputDiv").html(`Weather for ${weatherDay} is ${weatherNow} <img src = ${icon}></img>`);

    // why won't this output to DOM?
    // $("#outputDiv").html(`${weather}.forecast.txt_forecast.forecastday[0].fcttext`);

    // is weather passed from the function called on done to resolve to then?

  });  
});



