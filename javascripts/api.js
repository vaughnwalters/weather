"use strict";

// accepts zip as arg because in another module it will have pulled that value in
// build the promises in api.js 
// when building promises on one module, setting it up so another module can a .then after resolve

// tonight:
// get weather back
// parse out to DOM
// set up new project
//   set up read write rules
//   -(change songs to weather)
//   change sign in method
// sign up fields (use music history firebase user js)
// do firebase config


function getWeather (zip) {
  console.log("zip",zip.val());
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `http://api.wunderground.com/api/d58df01e95d05682/forecast/q/${zip.val()}.json`
      // because i am giving it zip, and weather is going to be the output that comes back
    }).done(function(weather) {
      resolve(weather);
    });
  });
}


module.exports = getWeather;


// to call this in another module
// require api
// .then has access to weather 
// carrier that brings weather back to this function

// api.getWeather(jquery value of zip code grabbed from dom)
// .then(function (weather) {
//   // parse data to output to DOM
// })