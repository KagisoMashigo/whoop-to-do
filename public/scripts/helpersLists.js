//  toggles the add item text area and submit button
const toggleForm = () => {
  const $addItem = $('.add_item');
  $addItem.on('click', function () {
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

// Ajax for delete item button from specific lists
  $('.display-personal-lists').on('click', '#delete', (event) => {
    const itemId = $(event.currentTarget).parent().parent().parent().attr("id")
    $.ajax(`/list/:listID/delete/${itemId}`, { method: "POST" })
      .then((response) => {
        console.log(response)
      })
  })
// Ajax to favourite item from specific lists
  $('.display-personal-lists').on('click', '#fave', (event) => {
    const itemId = $(event.currentTarget).parent().parent().parent().attr("id")
    $.ajax(`/list/:listID/fave/${itemId}`, { method: "POST" })
      .then((response) => {
        console.log(response)
      })
  })
})


