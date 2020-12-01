// This is responsible for toggling the form using the arrow on the page
const toggleForm = () => {
  const $addItem = $('.add_item');
  $addItem.on('click', function() {
    const $itemForm = $('.item_toggle');
    if ($itemForm.is(":visible")) {
      $itemForm.slideUp(750);
    } else {
      $itemForm.slideDown(750);
    }
  });
};

// Document ready ensures all functions will only be called once the page has loaded
$(document).ready(() => {
  toggleForm();
  // test for login form


});
