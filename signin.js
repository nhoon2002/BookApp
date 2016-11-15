//Initialize Firebase
var config = {
  apiKey: "AIzaSyDnE8O14I4Tm0hdG0WIL1ZAXZRGKEnr2yc",
  authDomain: "fir-tester-5e288.firebaseapp.com",
  databaseURL: "https://fir-tester-5e288.firebaseio.com",
  storageBucket: "fir-tester-5e288.appspot.com",
  messagingSenderId: "1022221600483"
};



firebase.initializeApp(config);
var database = firebase.database();

$('#loginSubmit').on("click" , function() {

   var userEmail = $('#userName').val().trim();
   var userPass =  $('#userPw').val().trim();




   var auth = firebase.auth();
   var promise = auth.signInWithEmailAndPassword(userEmail, userPass);


});

$('#createSubmit').on("click" , function() {

   var userEmail = $('#userName').val().trim();
   var userPass =  $('#userPw').val().trim();




   var auth = firebase.auth();
   var promise = auth.createUserWithEmailAndPassword(userEmail, userPass)
      .then(function (a1, a2, a3) {

         window.location = "signin.html"
         alert('Please log-in again!');// redirects you to another page (search usage on MDN)
      })
      .catch(function (error) {
         alert(error.message);
      });


});

firebase.auth().onAuthStateChanged(firebaseUser => {

   if(firebaseUser) {
      console.log(firebaseUser);
   } else {
      console.log('not logged in');
   }
});
