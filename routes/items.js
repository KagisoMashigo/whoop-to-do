const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT name, description
    FROM items
    WHERE list_id = 1`)
    .then(data => {
      const items = data.rows;
      // console.log('trying to get items', items);
        res.json({ items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
