const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // console.log('trying to get lists', db)
    db.query(`SELECT * FROM lists;`)
      .then(data => {
        const lists = data.rows;
        console.log("DATA:", lists)
        res.json({ lists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
