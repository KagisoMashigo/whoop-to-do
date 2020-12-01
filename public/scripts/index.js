// This file contains all the logic for displaying and appending a user's lists


// Fixes HTML vulnerabilities
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// Adds new element to a list by appending it.
const addItems = function($list, items) {
  for (let item of items) {
    console.log('addNewItem item is: ', item)
    $('ul', $list).append(`
    <li>${escape(item)}</li>`
    );
  }
};

// Creates a box containing the list's title and its elements.
// This box will exist inside the "display-lists" section in the body of index.ejs.
const createNewList = function(list) {
  console.log('createNewList listTitle is: ', list)
  let $list = $(`<article class="list" id="list">
                  <h5>${escape(list[0])}</h5>
                  <ul class="individual-list" id="individual-list">
                  </ul>
                 </article>`
                );
  addItems($list, list[1]);
  return $list;
};

// Renders the lists
const renderLists = function(lists) {
  let dbObj = {};
  for (let list in lists) {
    for (let item of lists[list]) {
      if (!dbObj[item.title]) {
        dbObj[item.title] = [item.name];
      } else {
        dbObj[item.title].push(item.name);
      }
    }
  }
  for (let list of Object.entries(dbObj)) {
    console.log('renderList title is: ', list)
    const $list = createNewList(list);
    $('#display-lists').append($list);
  }
};


// Rendering the tweets (see further comments)
$(document).ready(function() {
  console.log("Ready to go!");
  $.ajax('/api/userlist', { method: 'GET' })
  .then(renderLists)
});
