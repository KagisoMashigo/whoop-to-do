$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user in users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/lists"
  }).done((lists) => {
    for(list in lists) {
      $("<div>").text(list.title).appendTo($("body"));
    }
  });;
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/categories"
  }).done((categories) => {
    for(category in categories) {
      $("<div>").text(category.category).appendTo($("body"));
    }
  });
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/items"
  }).done((items) => {
    for(item in items) {
      $("<div>").text(item.name).appendTo($("body"));
    }
  });
});
