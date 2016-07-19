"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    fb = require("./fb-getter"),
    fbData = fb();

// ****************************************
// DB interaction using Firebase REST API
// ****************************************
// pass in a query string of firebase methods
function getSongs(userId) {
  return new Promise(function ( resolve, reject) {
    $.ajax({
      url: `https://music-history-55d61.firebaseio.com/songs.json?orderBy="uid"&equalTo="${userId}"`
    }).done(function(songData) {
      resolve(songData);
    });
  });
};

// // firebase call to database, and wrap in promise
function addSong(songFormObj) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: "https://music-history-55d61.firebaseio.com/songs.json",
      type: "POST",
      data: JSON.stringify(songFormObj),
      dataType: "json",
    }).done(function(songId){
      resolve(songId)
    });  
  });
}

function deleteSong(songId) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `https://music-history-55d61.firebaseio.com/songs/${songId}.json`,
      method: "DELETE"
    }).done(function() {
      resolve();
    })
  })
}

function getSong(songId) {
  console.log("in getSong" );
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `https://music-history-55d61.firebaseio.com/songs/${songId}.json`
    }).done(function (songData) {
      resolve(songData);
    });
  });
}

function editSong(songFormObj, songId) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `https://music-history-55d61.firebaseio.com/songs/${songId}.json`,
      type: "PUT",
      data: JSON.stringify(songFormObj)
    }).done(function(data) {
      resolve(data);
    });
  });
}

module.exports = {
  getSongs,
  addSong,
  getSong,
  deleteSong,
  editSong
};