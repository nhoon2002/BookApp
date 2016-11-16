//Initialize Firebase

  var config = {
    apiKey: "AIzaSyBgYGd6bm_24eet545xwnmP0hRRcb24AS8",
    authDomain: "booklibrary-9238d.firebaseapp.com",
    databaseURL: "https://booklibrary-9238d.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "894990803879"
  };

  var currentUser_uid;


firebase.initializeApp(config);
var database = firebase.database();


//Clicking the log in button...
$('#loginSubmit').on("click" , function() {
   //Saves input fields into local variables
   var userEmail = $('#userName').val().trim();
   var userPass =  $('#userPw').val().trim();

   //firebase user creation steps
   var auth = firebase.auth();
   var promise = auth.signInWithEmailAndPassword(userEmail, userPass)
      .then (function() {
         window.location = "bookshelf.html";
      })
      .catch(function (error) {
         alert(error.message);
      });



});

//Clicking the sign up button...
$('#createSubmit').on("click" , function() {

   var userEmail = $('#userName').val().trim();
   var userPass =  $('#userPw').val().trim();
   // var userDisplay = $('#userDisplay').val().trim();



   var auth = firebase.auth();
   var promise = auth.createUserWithEmailAndPassword(userEmail, userPass)
      .then(function() {

         window.location = "signin.html"//reloads the log-in page
         alert('Please log-in again!');
      })

      .catch(function (error) {
         alert(error.message);
      });

         var user = firebase.auth().currentUser;
         console.log(user);
         var email = user.email;
         var uid = user.uid;

         //creates a new node on firebase under the UID of the user that just created the account.
         database.ref("users").child(user.uid).set({
            email: user.email
         })


});

//Clicking the log-out button...
$('.log_out').on('click', function(){
   firebase.auth().signOut(); //signs out current user
   window.location = "signin.html"; //reloads signin page

   if(firebaseUser) {
      console.log(firebaseUser);

   } else {
      console.log('not logged in');
      alert("You have been logged out!");
   }

});

firebase.auth().onAuthStateChanged(firebaseUser => {

   if(firebaseUser) { //if user is logged in...
      console.log("logged in as: "+firebaseUser);


   } else {
      console.log('not logged in');
   }

      //Stores information of currently logged user



});
