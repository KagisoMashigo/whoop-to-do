const request = require('request');
const express = require('express');
const router  = express.Router();

module.exports = (formInput) => {
  console.log('Trying TMDB function');
  router.get("/", (req, res) => {
    request(`https://api.themoviedb.org/3/search/movie?api_key=0ee58801eee865ef1538b59630b19b32&query=${formInput}`, (error, response, body) => {
      const data = JSON.parse(body);
      const movies = {};
      for (let entries of data.results) {
        let title = entries.title;
        let overview = entries.overview;
        movies[title] = overview;
      }
      console.log(Object.keys(movies).length)
      res.json({ movies });
    })
  });
  return router;
};
