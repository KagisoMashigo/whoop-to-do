// This file contains all the logic for displaying and appending a user's lists


// Fixes HTML vulnerabilities
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// Adds new element to a list by appending it.
const addNewItem = function(listTitle, list) {
  let arr = [];
  for (let item in list) {
    if (list[item].title === listTitle) {
      arr.push(list[item].name)
    }
  }
  arr.forEach(item => {
    $('#individual-list').append(`
    <li>${escape(item)}</li>`
    );
  })
};

// Maybe create a function that loops through the lists (?)

// Creates a box containing the list's title and its elements.
// This box will exist inside the "display-lists" section in the body of index.ejs.
const createNewList = function(lists) {
  console.log('createNewList: ', lists)
  let arr = [];
  for (let item in lists) {
    if (!arr.includes(lists[item].title)) {
      arr.push(lists[item].title);
    }
  }
  arr.forEach(listTitle => {
    let $list = $(`<article class="list" id="list">
                    <h5>${escape(listTitle)}</h5>
                    <ul class="individual-list" id="individual-list">
                      ${escape(addNewItem(listTitle, lists))}
                    </ul>
                   </article>`
                   );
    return $list;
  })

};

// ^ Needs a function that creates a list object (?) ^

// syntax: ${escape(list.dbPath)}

// Renders the lists
const renderLists = function(lists) {
  let dbObj = {};
  for (let list in lists) {
    if (Array.isArray(lists[list])) {
      for (let item of lists[list]) {
        console.log('array elements: ', item);
        // const $list = createNewList(item);
        // $('#display-lists').append($list);
      }
    }
    // for (let element of lists[list]) {
    //   console.log(element)
    // }
  }
  // if (Array.isArray(lists[0])) {
  //   for (let list of lists) {
  //     console.log('array elements: ', list);
  //     const $list = createNewList(list);
  //     $('#display-lists').append($list);
  //   }
  // } else {
  //   const $list = createNewList(lists);
  //   $('#display-lists').append($list);
  // }
};


// Rendering the tweets (see further comments)
$(document).ready(function() {
  console.log("Ready to go!");
  $.ajax('/api/userlist', { method: 'GET' })
  .then(renderLists)

  // getListByUser()
});
