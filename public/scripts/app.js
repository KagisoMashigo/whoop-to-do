$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/lists"
  }).done((lists) => {
    for(list of lists) {
      $("<div>").text(list.title).appendTo($("body"));
    }
  });;
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/categories"
  }).done((categories) => {
    for(category of categories) {
      $("<div>").text(category.category).appendTo($("body"));
    }
  });;
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/items"
  }).done((items) => {
    for(item of items) {
      $("<div>").text(item.name).appendTo($("body"));
    }
  });;
});
