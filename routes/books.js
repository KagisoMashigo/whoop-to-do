const express = require('express');
const router  = express.Router();
const axios = require('axios');


module.exports = (db) => {

  router.post("/", (req, res) => {

    const { title, author} = req.body;

    axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter+inauthor:rowling&key=AIzaSyBT-iVATn5jscoq7CUm_qUmzb_s9NdR01E')
    .then(function (response) {
      // handle success
      console.log(response);
      db.query(
        `INSERT INTO books (title, descritption, author)
        VALUES ($1, $2, $3);
        `
        )
        .then(dbres => {
          // last step if all goes well
          res.redirect("list")
        })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

  });

  return router;
};

const fetchMyIP = function(callback) {
  
};