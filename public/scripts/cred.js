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

// Function made to check errors on form submission
const checkSectionErrors = (section, errMsgHtml, delay, slideSpeed) => {
  $(section).empty();
  const output = $(section).append(errMsgHtml).slideDown(slideSpeed).delay(delay).slideUp(slideSpeed);
  return output;
};

// Document ready ensures all functions will only be called once the page has loaded
$(document).ready(() => {
  toggleForm();

  // Login error handling
  $("#log_form").submit(function(event) {
    // console.log("SUBMITTED")
    if ($('#log_email').val().length === 0) {
      checkSectionErrors('.errors', `<strong>⚠️ Please enter a valid email address </strong>`, 1500, 'slow');
      event.preventDefault();
      console.log("SUBMITTED")
    } else if ($('#log_password').val().length === 0) {
      checkSectionErrors('.errors', `<strong>⚠️ Please enter a valid password </strong>`, 1500, 'slow');
      event.preventDefault();
      console.log("SUBMITTED2")
    }
  });

  // Reg error handling
  $("#reg_form").submit(function(event) {
    // console.log("SUBMITTED")
    if ($('#reg_name').val().length === 0) {
      checkSectionErrors('.errors', `<strong>⚠️ Please enter a name, like the one you were given maybe? </strong>`, 1500, 'slow');
      event.preventDefault();
      console.log("SUBMITTED")
    } else if ($('#reg_email').val().length === 0) {
      checkSectionErrors('.errors', `<strong>⚠️ Please enter an email </strong>`, 1500, 'slow');
      event.preventDefault();
      console.log("SUBMITTED2")
    } else if ($('#reg_password').val().length === 0) {
      checkSectionErrors('.errors', `<strong>⚠️ Please enter a password </strong>`, 1500, 'slow');
      event.preventDefault();
      console.log("SUBMITTED3")
    }
  });


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
