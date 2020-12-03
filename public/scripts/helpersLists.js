
// Fixes HTML vulnerabilities
// const escape = function (str) {
//   let div = document.createElement('div');
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };

// // This is responsible for toggling the form using the arrow on the page
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
  // test for login form

  $('.display-personal-lists').on('click', '#delete', (event) => {
   // console.log(event.currentTarget, "click")
    const itemId = $(event.currentTarget).parent().parent().parent().attr("id")
      console.log("itemID:", itemId)
    $.ajax(`/list/:listID/delete/${itemId}`, { method: "POST" })
      .then((response) => {
        getList()
        console.log(response)
      })
  })

  $('.display-personal-lists').on('click', '#fave', (event) => {
   // console.log(event.currentTarget)

    const itemId = $(event.currentTarget).parent().parent().parent().attr("id")
       console.log("itemID:", itemId)
    $.ajax(`/list/:listID/fave/${itemId}`, { method: "POST" })
      .then((response) => {

        console.log(response)
      })
  })

//   // $('.add_item').on('click', '#add', (event) => {
//   //   console.log('log', event.currentTarget).parent().parent()
//   // })


})

// <form action="/lists" method="POST" class="item_toggle">
// <label for="new_item_name"> </label>
// <textarea name="text"  id="name-text" placeholder ="Name of new item"></textarea>
// <button id="add"type="submit">Submit</button>
// </form>

// const addItems = function ($list, items) {
//   // console.log("add item's item is: ", item)
//   $('container', $list).append(`
//    <div class ="name">
//    ${escape(items.name[0])}
//   </div>
//   <div class="description">
//   ${escape(items.description[0])}
//   </div>`
//   );
// };


// const createNewPersonalList = function (items) {
//   let $list = $(`
//     <li id="${items[0]}">
//       <label for="todo-${items[0]}">
//         <input id="todo-${items[0]}" type="checkbox">
//           <container class ="container">
//           </container>
//       </label>
//    <footer class= "buttons">
//        <form class="item_delete">
//        <button id ="delete" type="submit">
//          <span class="glyphicon glyphicon-trash"></span>
//        </button>
//      </form>
//      <form class="item_fave">
//        <button id="fave" type="submit">
//          <span class="glyphicon glyphicon-heart"></span>
//          </button>
//        </form>
//        </footer>
//     </li>`);
//   addItems($list, items[1]);
//   return $list


  // edit button
  // <button id="edit">
  //        <span class="glyphicon glyphicon-edit"></span>
  //      </button>



// };

// Renders the lists
// const renderPersonalLists = function (lists) {
//   let dbObj = {};
//   for (let list in lists) {
//     for (let item of lists[list]) {
//       if (!dbObj[item.id]) {
//         dbObj[item.id] = { name: [item.name], description: [item.description] }
//         // dbObj[item.title] = [item.name];
//       } else {
//         dbObj[item.id].name.push(item.name);
//         dbObj[item.id].description.push(item.description);
//       }
//     }
//   }
//   for (let list of Object.entries(dbObj)) {
//     // console.log(list)
//     const $list = createNewPersonalList(list);
//     $('#display-personal-lists').append($list);
//   }
// };


// $(document).ready(function () {
//   getList();
//   console.log("Ready to go!");
// });

// const getList = () => {
//   $.ajax('/list/:listID', { method: 'GET' })
//     .then((lists) => {
//       console.log('ajax promise argument: ', lists)
//       renderPersonalLists(lists)
//     });
// }

