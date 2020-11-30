// This file contains all the logic for displaying and appending a user's lists

// Fixes HTML vulnerabilities
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// Adds new element to a list by appending it.
const addNewItem = function(item) {
  let $item = $();
  return $item;
}

// Maybe create a function that loops through the lists (?)

// Creates a box containing the list's title and its elements.
// This box will exist inside the "display-lists" section in the body of index.ejs.
const createNewList = function(list) {
  let $list = $(`<article class="list" id="list">
                   <h5>Books</h5>
                   <ul>
                     <li>1984</li>
                     <li>The Ultimate Hitchhiker's Guide to the Galaxy</li>
                     <li>Farenheit 451</li>
                     <li>The Hobbit</li>
                     <li>Moliere: L'Oeuvre Complete</li>
                   </ul>
                 </article>`
                );
  return $list;
};

// ^ Needs a function that creates a list object (?) ^

// syntax: ${escape(list.dbPath)}

// Renders the lists
const renderLists = function(/*lists*/) {
  // if (Array.isArray(lists)) {
  //   for (let list of lists) {
  //     const $list = createNewList(list);
  //     $('#display-lists').append($list);
  //   }
  // } else
   {
    // const $list = createNewList(lists);
    $('#display-lists').append(`
    <article class="list" id="list">
    <h5>Books</h5>
    <ul>
      <li>1984</li>
      <li>The Ultimate Hitchhiker's Guide to the Galaxy</li>
      <li>Farenheit 451</li>
      <li>The Hobbit</li>
      <li>Moliere: L'Oeuvre Complete</li>
    </ul>
  </article>
  `);
  }
};


// Rendering the tweets (see further comments)
$(document).ready(function() {
  console.log("Ready to go!");
  renderLists()
});
