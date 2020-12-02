$(document).ready(function() {
  console.log('nav, ready to go!')

  $('#food').on('click', function(e) {
    const listID = e.delegateTarget.id;
    if (listID === 'food') {
      console.log('Yummy!')
    }
  })

  $('#books').on('click', function(e) {
    const listID = e.delegateTarget.id;
    if (listID === 'books') {
      console.log('All art is quite useless.')
    }
  })

  $('#movies').on('click', function(e) {
    const listID = e.delegateTarget.id;
    if (listID === 'movies') {
      console.log('WHAT\'S IN THE BOX?!')
    }
  })

  $('#products').on('click', function(e) {
    const listID = e.delegateTarget.id;
    if (listID === 'products') {
      console.log('Yay! Capitalism!')
    }
  })
})
