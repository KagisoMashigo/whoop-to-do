const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session["user_id"];
    // const user = users[req.session.user_id]
    if (userID) {
    db.query(`
    SELECT lists.title, lists.id, items.*, users.username
    FROM lists
    JOIN items ON list_id = lists.id
    JOIN users ON user_id = users.id
    WHERE users.id = $1;
    `, [userID])
    .then(data => {
      const list = data.rows;
      res.json({ list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      (db.query(`
      SELECT lists.title, lists.id, items.*
      FROM lists
      JOIN items ON list_id = lists.id
      WHERE lists.public = true;
     `))
        .then(data => {
        const list = data.rows;
        res.json({ list });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      }
  });
  return router;
};
