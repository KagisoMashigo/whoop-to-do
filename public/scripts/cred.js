// This is responsible for toggling the form using the arrow on the page
const toggleForm = () => {
  const $arrow = $('#togglearrow');
  $arrow.on('click', function() {
    const $error = $('#error'); 
    const $newTweet = $('.tweet-form');
    if ($newTweet.is(":visible")) {
      $newTweet.slideUp(750);
    } else {
      $newTweet.slideDown(750);
    }
  });
};

// Document ready ensures all functions will only be called once the page has loaded
$(document).ready(() => {
  toggleForm();
  // test for login form
$("#signup").on('click', function() {
  console.log("Clicked!")
  $(".message").css("transform", "translateX(100%)");
  if ($(".message").hasClass("login")) {
    $(".message").removeClass("login");
  }
  $(".message").addClass("signup");
});

$("#login").on('click', function() {
  console.log("Clicked!")
  $(".message").css("transform", "translateX(0)");
  if ($(".message").hasClass("login")) {
    $(".message").removeClass("signup");
  }
  $(".message").addClass("login");
});
});