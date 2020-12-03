$(document).ready(function() {
  console.log('nav, ready to go!')

  $('#logo').on('click', function(e) {
    window.location.href = `/`;
  });

  $.ajax('/api/foodlists', { method: 'GET' })
  .then((list) => {
    $('#food').on('click', () => {
      window.location.href = `/list/${list.list[0].id}`;
    })
  });

    $.ajax('/api/booklists', { method: 'GET' })
  .then((list) => {
    $('#books').on('click', () => {
      window.location.href = `/list/${list.list[0].id}`;
    })
  });

  $.ajax('/api/movielists', { method: 'GET' })
  .then((list) => {
    $('#movies').on('click', () => {
      window.location.href = `/list/${list.list[0].id}`;
    })
  });

  $.ajax('/api/productlists', { method: 'GET' })
  .then((list) => {
    $('#products').on('click', () => {
      window.location.href = `/list/${list.list[0].id}`;
    })
  });

  $('#form-add').on('click', function() {
    alert('Knock knock!')
  })


})
