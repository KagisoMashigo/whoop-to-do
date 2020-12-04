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


module.exports = (db) => {

  router.post("/", fetchMovie)
  return router;

}
