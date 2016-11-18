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
var isbn = {};

//Clicking the log in button...
$('#loginSubmit').on("click" , function() {
   //Saves input fields into local variables
   var userEmail = $('#userName').val().trim();
   var userPass =  $('#userPw').val().trim();


   //firebase authorization requirement
   var auth = firebase.auth();
   //Sign in function for firebase
   var promise = auth.signInWithEmailAndPassword(userEmail, userPass)
      .then (function() {
         //Loads the dashboard upon successful signin
         window.location = "dashboard.html";
         // window.location = "bookshelf.html";
      })
      .catch(function (error) {
         alert(error.message);
      });



});

// Fetch a Blog Post by ID. Returns a Promise of an actual object, not a DataSnapshot.


//Clicking the sign up button...
$('#createSubmit').on("click" , function() {

   var userEmail = $('#userName').val().trim();
   var userPass =  $('#userPw').val().trim();
   var userDisplay = $('#userDisplay').val().trim();
   var userGender = $('#userGender').val().trim();


   //Firebase authentication requirement
   var auth = firebase.auth();

   //Creates accounts to firebase
   var promise = auth.createUserWithEmailAndPassword(userEmail, userPass)
      .then(function() {
         var loggedUser = firebase.auth().currentUser;

         //If successful creation, creates the following children to the user branch (labeled by uid)
         database.ref("users").child(loggedUser.uid).set({
            email: loggedUser.email,
            nickname: userDisplay,
            gender: userGender,
            books:'' //will add later
         });

         //TODO not sure if this ALERT code breaks everything
         alert('Please log-in again!');

         window.location = "signin.html"; //Reloads the log-in page

      })

      .catch(function (error) {
         alert(error.message);
      });


}); //end of 'create' onclick function



//On load,
database.ref('users').once("value", function(snapshot) {
   //////////////////DASHBOARD//////////////////////
   $('#helloUser').html('Hello, '+snapshot.child(firebase.auth().currentUser.uid).val().nickname);
   $('#UserBooksCount').html(snapshot.child(firebase.auth().currentUser.uid).child('books').numChildren());

   console.log('You have '+snapshot.numChildren()+' users.');
   var friendsUID = Object.keys(snapshot.val());


   var friendsNick=[];
   var friendsGender=[];


   for (var j = 0; j < friendsUID.length; j++) {
      friendsNick.push(snapshot.child(friendsUID[j]).val().nickname);
      friendsGender.push(snapshot.child(friendsUID[j]).val().gender);
      var friendavatar = $('<img>');

         if (friendsGender[j] == 'M') {
            friendavatar.attr('src', 'assets/images/H05.png');
            friendavatar.attr('data-nick', friendsNick[j]);
            friendavatar.addClass("prof");
            friendavatar.attr('data-isbn', friendsUID[j]);

         } else {
            friendavatar.attr('src', 'assets/images/FE05.png');
            friendavatar.attr('data-nick', friendsNick[j]);
            friendavatar.addClass("prof");
            friendavatar.attr('data-isbn', friendsUID[j]);
         }
         // debugger;
      $('.placeholders').append(friendavatar);

         //insert caption: nickname

   }
   console.log(friendsNick, friendsGender);
   // friendavatar.addClass

   if(snapshot.child(firebase.auth().currentUser.uid).val().gender == 'M') {
      $('#divAvatar').html("<img src='assets/images/H05.png'>");
   } else {
      $('#divAvatar').html("<img src='assets/images/FE05.png'>");
   }



   var currentUID = firebase.auth().currentUser.uid;

   // console.log(snapshot.val());

   var isbnarray = Object.values(snapshot.child(currentUID).val().books);
   console.log(isbnarray);
   isbn = isbnarray;
   $('.prof').on('click', function() {
      var clickedUID = $(this).data('isbn');
      var clickedNICK = $(this).data('nick');
      $('.shelf').empty();
      $('#shelf').html(clickedNICK+'&rsquo;s collection')
      // console.log(clicked);
      getBookInfoFromFirebase(Object.values(snapshot.child(clickedUID).val().books));
   })
   getBookInfoFromFirebase(isbn);
   // debugger;

   // debugger;


});

// database.ref("users").once('value', function(snapshot) {







// });


//On child added, returns each branch data one at a time


//TODO Add an 'about me' or a 'welcome' dashboard

//TODO Each time an 'add book' button is pressed: push each 'book-object (isbn, imgurl, etc)' under 'bookshelf' child under the user branch.

//TODO Each time 'delete book' button is pressed, find an identifier for the specific book and delete the child from the database.

//TODO Each time a user-avatar is clicked, repopulate the bookshelf with data that corresponds to the user, with either a active-css pseudo or appending bookshelf name to the top.


//Clicking the log-out button...
//TODO create a log-out button on each html page

$('.log_out').on('click', function(){
   firebase.auth().signOut(); //signs out current user
   window.location = "signin.html"; //Reloads signin page

   if(firebaseUser) { //if a user is logged in still...
      console.log(firebaseUser);

   } else { //if successful logout...
      console.log('not logged in');
      alert("You have been logged out!");
   }

});


//When an authentication state has been changed...
firebase.auth().onAuthStateChanged(firebaseUser => {

   // var refObject = firebase.database().ref().child('users');
   console.log(firebase.auth().currentUser.uid);


   if(firebaseUser) { //if user is logged in...

      console.log("auth status changed: logged in as: " + firebaseUser.email);

   } else {
      console.log('auth status changed: not logged in');

   }

});

///////////////////////////////////////THIS!!!!!!!!!!!!!
//adds a randomly-keyed child onto 'books' with the value: isbn

////////////////////////////////////////////////////////////

// JS for autosearch of books and display of results   =====================================




$(document).ready(function () {  // only begin once page has loaded
    // ==================================================================================

    $("#txtBookSearch").autocomplete({ // attach auto-complete functionality to textbox
        // define source of the data

        source: function (request, response) {
            // url link to google books, including text entered by user (request.term)
            var booksUrl = "https://www.googleapis.com/books/v1/volumes?printType=books&q=" + encodeURIComponent(request.term);
            $.ajax({
                url: booksUrl,
                dataType: "jsonp",
                success: function(data) {
                    response($.map(data.items, function (item) {
                        if (item.volumeInfo.authors && item.volumeInfo.title && item.volumeInfo.industryIdentifiers && item.volumeInfo.publishedDate)
                        {
                            return {
                                // label value will be shown in the suggestions
                                label: item.volumeInfo.title + ', ' + item.volumeInfo.authors[0] + ', ' + item.volumeInfo.publishedDate,
                                // value is what gets put in the textbox once an item selected
                                value: item.volumeInfo.title,
                                // other individual values to use later
                                title: item.volumeInfo.title,
                                author: item.volumeInfo.authors[0],
                                isbn: item.volumeInfo.industryIdentifiers,
                                publishedDate: item.volumeInfo.publishedDate,
                                image: (item.volumeInfo.imageLinks == null ? "" : item.volumeInfo.imageLinks.thumbnail),
                                description: item.volumeInfo.description,
                            };
                        }
                    }));
                return false;
                }
            });
        },// ==================================================================================
          // Diaplays the books information when clicked from the auto suggestions
        select: function (event, ui) {
            // what to do when an item is selected
            // first clear anything that may already be in the description

            $('#divDescription1').empty();
            $('#divDescription2').empty();

            // show a pic if we have one
            if (this.image != '')
            {
                $('#divDescription1').append('<img src="' + ui.item.image + '" style="float: left; padding: 10px;">');
            }
                // and title, author, and year
                $('#divDescription1').append('<h3><b>' + ui.item.title  + '</b></h3>');
                $('#divDescription2').append('<p><b>Author:</b> ' + ui.item.author  + '</p>');
                $('#divDescription2').append('<p><b>First published year:</b> ' + ui.item.publishedDate  + '</p>');
                // and the usual description of the book
                $('#divDescription2').append('<p><b>Description:</b> ' + ui.item.description  + '</p>');
                // and show the link to oclc (if we have an isbn number)
            if (ui.item.isbn && ui.item.isbn[0].identifier)
            {
                $('#divDescription2').append('<P><b>ISBN:</b> ' + ui.item.isbn[0].identifier + '</p>');
                $('#divDescription2').append('<a href="http://www.worldcat.org/isbn/' + ui.item.isbn[0].identifier + '" target="_blank">View item on worldcat</a>');
            }
            // ===========================================
            // add button to append the book on the shelf
            var addBookButton = $('<button>');
            var addBookButton2 = $('<button>');

            // add class to shelf
            addBookButton.addClass("addToShelf addRemove");
            addBookButton2.addClass("removeFromShelf addRemove");

            // create an image class and add add/remove button
            var addBookImage = $("<img>");
            var addBookImage2 = $("<img>");
            addBookImage.attr("src", "assets/images/add_book.png");
            addBookImage2.attr("src", "assets/images/add_book.png");

            // add the button image to the button
            addBookButton.prepend(addBookImage);
            addBookButton2.prepend(addBookImage2);

            // create variable that finds h2 withing #divDescription and add add/remove button
            var $h3 = $('#divDescription1').find("h3");
            $h3.after(addBookButton2);
            $h3.after(addBookButton);
            // ===========================================

            // Adding and removing the book from shelf
            // =================================================================================
                // Add button 'book to shelf'
                $('.addToShelf').on('click', function() {
                   database.ref("users").child(firebase.auth().currentUser.uid).child(
                      'books').push(ui.item.isbn[0].identifier);
                    // Add the book to the shelf and create data attr with the books information
                	$(".shelf").append('<div class="books col-xs-3"><img src=' + ui.item.image + ' class="img-responsive books" data-isbn=' + ui.item.isbn[0].identifier + '></div>');

                        // add the books isbn to the users book array
                        // TODO: add to firebase
                        // isbn.push(ui.item.isbn[0].identifier);
                        // console.log(userBooks);
                        console.log(ui.item.isbn[0].identifier);
                });



            // console.log(userBooks);
            // return false;
        }, // END // select: function

        minLength: 2 // set minimum length of text the user must enter
    }); // END $("#txtBookSearch").autocomplete({ // attach auto-complete functionality to textbox
     // ======================================================================================



       // Click book for more information using AJAX
       // ======================================================================================
       // ======================================================================================
       // when you click on a book, it displays the information on the page
       $(document).on('click', '.img-responsive', function() {
            // first clear anything that may already be in the description
            $('#divDescription1').empty();
            $('#divDescription2').empty();
            $('#divAvatar').empty();

        // grabs isbn number from data attr
        var isbn2 = $(this).attr('data-isbn');
        console.log(this);
      //   isbn.push(isbn2.toString());

        // Function that get the info from google API
        function getBookInfo(){

            var queryURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn2;

            // Creates AJAX call for the specific book being selected
            $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
                // ===================================================
                // Adds the books info on the right side
                        console.log(response);
                        $('#divDescription1').append('<img src=' + response.items[0].volumeInfo.imageLinks.smallThumbnail + ' style="float: left; padding: 10px;">');
                        // and title, author, and year
                        $('#divDescription1').append('<h3><b>' + response.items[0].volumeInfo.title  + '</b></h3>');
                        $('#divDescription2').append('<p><b>Author:</b> ' + response.items[0].volumeInfo.authors  + '</p>');
                        $('#divDescription2').append('<p><b>First published year:</b> ' + response.items[0].volumeInfo.publishedDate  + '</p>');
                        // and the usual description of the book
                        $('#divDescription2').append('<p><b>Description:</b> ' + response.items[0].volumeInfo.description  + '</p>');
                        // and show the link to oclc (if we have an isbn number)
                    if (response.items[0].volumeInfo.industryIdentifiers[0].identifier)
                    {
                        $('#divDescription2').append('<P><b>ISBN:</b> ' + response.items[0].volumeInfo.industryIdentifiers[0].identifier + '</p>');
                        $('#divDescription2').append('<a href="http://www.worldcat.org/isbn/' + response.items[0].volumeInfo.industryIdentifiers[0].identifier + '" target="_blank">View item on worldcat</a>');
                    }
                // =============================================
                    // add button to append the book on the shelf
                    var addBookButton = $('<button>');
                    var addBookButton2 = $('<button>');

                    // add class to shelf
                    addBookButton.addClass("addToShelf addRemove");
                    addBookButton2.addClass("removeFromShelf addRemove");

                    // create an image class and add add/remove button
                    var addBookImage = $("<img>");
                    var addBookImage2 = $("<img>");
                    addBookImage.attr("src", "assets/images/add_book.png");
                    addBookImage2.attr("src", "assets/images/add_book.png");

                    // add the button image to the button
                    addBookButton.prepend(addBookImage);
                    addBookButton2.prepend(addBookImage2);

                    // create variable that finds h2 withing #divDescription and add add/remove button
                    var $h3 = $('#divDescription1').find("h3");
                    $h3.after(addBookButton2);
                    $h3.after(addBookButton);

                // =============================================

            }); // END ajax call

        } // END function getBookInfo
        getBookInfo();






        }); // END  $(document).on('click', '.books', function()




}); // END $(document).ready(function () {  // only begin once page has loaded





   function getBookInfoFromFirebase(isbn){
      for (var i = 0; i < isbn.length; i++){
         // debugger;

         var queryURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn[i];
         // Creates AJAX call for the specific movie being
         $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            console.log(response);
            console.log(response.kind);
            console.log(response.items[0].volumeInfo);
            console.log(response.items[0].volumeInfo.industryIdentifiers[0].identifier);

            $(".shelf").append('<div class="books col-xs-3"><img src=' + response.items[0].volumeInfo.imageLinks.smallThumbnail + ' class="img-responsive books" data-isbn=' + response.items[0].volumeInfo.industryIdentifiers[0].identifier + ' data-title=' + response.items[0].volumeInfo.title + ' data-author='+ response.items[0].volumeInfo.authors +' data-publishDate='+
            response.items[0].volumeInfo.publishedDate+' data-description='+response.items[0].volumeInfo.description+'/></div>');


         }); // END AJAX
         // END forloop
      }



   };
