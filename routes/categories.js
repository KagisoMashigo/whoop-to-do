const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM categories;`)
    .then(data => {
      const categories = data.rows;
      // console.log('trying to get categories', categories);
        res.json({ categories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
