const request = require('request');
const express = require('express');
const router  = express.Router();


const fetchMovie = (req, res) => {
  request(`https://api.themoviedb.org/3/search/movie?api_key=0ee58801eee865ef1538b59630b19b32&query=${req.body.search}`, (error, response, body) => {
    const data = JSON.parse(body);
    const movies = [];
    for (let entries of data.results) {
      let title = entries.title;
      let overview = entries.overview;
      movies.push({ title, overview });
    }
    res.json({ movies });
  })
};

// const newItem = (req, res) => {
//   fetchMovie(req, res)
//   .then
//   const itemName = req.body.search
//   const userID = req.session["user_id"];
//   const itemID = req.params.id;
//   const listID = req.params.listID;
//   db.query(`
//   INSERT INTO items (name, description, list_id)
//   VALUES ('${itemName}', 'For people who have given up on life in style', 4);
//   `,[itemID])
//   .then(item => {

//     // v change
//     res.redirect(`/list/${listID}`)
//   })
//   .catch(err => {
//     res
//       .status(500)
//       .json({ error: err.message });
//   });
// }


module.exports = (db) => {

  router.post("/", fetchMovie)
  return router;

}
