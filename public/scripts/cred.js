// This is responsible for toggling the form using the arrow on the page
const toggleForm = () => {
  const $loginReg = $('.toggle_register');
  $loginReg.on('click', function() {
    const $loginRegForm = $('.container');
    if ($loginRegForm.is(":visible")) {
      $loginRegForm.slideUp(750);
    } else {
      $loginRegForm.slideDown(750);
    }
  });
};

const loginErrors = () => {
  
}

// Function made to check errors on form submission
const checkSectionErrors = (section, errMsgHtml, delay, slideSpeed) => {
  $(section).empty();
  const output = $(section).append(errMsgHtml).slideDown(slideSpeed).delay(delay).slideUp(slideSpeed);
  return output;
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
