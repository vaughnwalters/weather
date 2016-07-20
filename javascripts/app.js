"use strict";

let $ = require('jquery'),
    api = require("./api"),
    zip = $("#zip"),
    auth = require("./auth"),
    addForecast = require("./db-interaction"),
    currentUser = null;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user.uid;
    console.log("currentUser logged in", currentUser);
    // Call this when using the REST API
    // loadSongsToDOM();
    // Call this when using Firebase SDK
    // db.getSongs(templates.makeSongList, currentUser);
  } else {
    console.log("User not logged in");
  }
});


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
    $("#outputDiv").html(`Weather for ${weatherDay} is ${weatherNow} <img src = ${icon}></img>
      <button id="save">SAVE</button>`);


    // why won't this output to DOM?
    // $("#outputDiv").html(`${weather}.forecast.txt_forecast.forecastday[0].fcttext`);

    // is weather passed from the function called on done to resolve to then?

  });  
});


// log in and exec the function to authorize user
$("#authBtn").click(function() {
  console.log("clicked auth");
  auth.loginGoogle();
});

$("#unauthBtn").click(function() {
  auth.logout();
  currentUser = null;
  console.log("clicked logout");
  console.log("current User", currentUser);
});


// on click of "save" button, add forecast to database
// define forecast as an object and then can add user and uid (a property on the auth obj)


$("#outputDiv").on("click", "#save", function() {
  let forecast = $("#outputDiv").html();
  let forecastObj = {
    forecast: forecast,
    currentUser: currentUser
  }
  console.log(forecastObj.forecast);
  console.log(forecastObj.currentUser);
  addForecast(forecastObj)
  .then(function(){
    console.log("forecastAdded");
  });
});




