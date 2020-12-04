const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session["user_id"];
    db.query(`
    SELECT items.*
    FROM items
    JOIN lists ON list_id = lists.id
    WHERE lists.user_id = $1`, [userID])
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
