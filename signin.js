//Initialize Firebase

  var config = {
    apiKey: "AIzaSyBgYGd6bm_24eet545xwnmP0hRRcb24AS8",
    authDomain: "booklibrary-9238d.firebaseapp.com",
    databaseURL: "https://booklibrary-9238d.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "894990803879"
  };


firebase.initializeApp(config);
var database = firebase.database();

//Clicking the log in button...
$('#loginSubmit').on("click" , function() {
   //Saves input fields into local variables
   var userEmail = $('#userName').val().trim();
   var userPass =  $('#userPw').val().trim();

   //firebase authorization requirement
   var auth = firebase.auth();
   var promise = auth.signInWithEmailAndPassword(userEmail, userPass)
      .then (function() {

         // TODO window.location = "bookshelf.html";
         //$(div).html(Welcome currentUser!)
      })
      .catch(function (error) {
         alert(error.message);
      });



});

//Clicking the sign up button...
$('#createSubmit').on("click" , function() {

   var userEmail = $('#userName').val().trim();
   var userPass =  $('#userPw').val().trim();
   var userDisplay = $('#userDisplay').val().trim();
   var userGender = $('#userGender').val().trim();



   var auth = firebase.auth();
   var promise = auth.createUserWithEmailAndPassword(userEmail, userPass)
      .then(function() {
         var user = firebase.auth().currentUser;
         database.ref("users").child(user.uid).set({
            email: user.email,
            nickname: userDisplay,
            gender: userGender
         });
         // alert('Please log-in again!');
         window.location = "signin.html";//reloads the log-in page

      })
      .catch(function (error) {
         alert(error.message);
      });








});



//Each time an account is created,
database.ref("users").on("child_added", function(snapshot) {
   console.log(snapshot.val());
   console.log(snapshot.val().nickname);
   console.log(firebase.auth().currentUser.uid);


});

//TODO Add an 'about me' or a 'welcome' dashboard

//TODO Each time an 'add book' button is pressed: push each 'book-object (isbn, imgurl, etc)' under 'bookshelf' child under the user branch.

//TODO Each time 'delete book' button is pressed, find an identifier for the specific book and delete the child from the database.

//TODO Each time a user-avatar is clicked, repopulate the bookshelf with data that corresponds to the user, with either a active-css pseudo or appending bookshelf name to the top.


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
   var refObject = firebase.database().ref().child('users');
   console.log(firebase.auth().currentUser.uid);

   // debugger;

   if(firebaseUser) { //if user is logged in...
      // currentUser = firebaseUser;
      console.log("logged in as: " + firebaseUser.email);
      // refObject.on("child_added", function(snapshot) {
      //    //
      //    console.log(snapshot.val().key);
      // });

   } else {
      console.log('not logged in');

   }

      //Stores information of currently logged user



});
