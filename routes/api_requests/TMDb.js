const request = require('request');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  console.log('Trying TMDB function');
  // request(`https://api.themoviedb.org/3/search/movie?api_key=0ee58801eee865ef1538b59630b19b32&query=${title}`, (error, response, body) => {
  //   const data = JSON.parse(body);
  //   if (data.results.length === 0) {
  //     console.log('No such movie in the Database');
  //   } else {
      // (db) => {
        router.get("/", (req, res) => {
          const userID = req.session["user_id"];
          if (userID) {
          db.query(`
          SELECT id
          FROM lists
          WHERE user_id = $1
          AND category_id = 1;
          `, [userID])
          .then(db.query(`
          INSERT INTO items (name, description, list_id)
          VALUES (${data.results.title}, ${data.results.overview}, ${data => {
            const list = data.rows.id
            res.json({ list })
          }})
          `))
            .catch(err => {
              res
              .status(500)
              .json({ error: err.message });
            });
          } else {
            res.redirect('/credentials')
          }
        });
        return router;
      // };
    // }
  // });
};
