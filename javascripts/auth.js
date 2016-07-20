"use strict";

let firebase = require("./firebaseConfig"),
    provider = new firebase.auth.GoogleAuthProvider(),
    currentUser = require("./currentUser");


function loginGoogle() {
  return firebase.auth().signInWithPopup(provider).then(function(result) {
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
};

function logout () {
  firebase.auth().signOut().then(function() {
  }, function(error) {
  // An error happened.
  });
}

module.exports = {loginGoogle, logout};