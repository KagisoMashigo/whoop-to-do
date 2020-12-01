const express = require('express');
const router  = express.Router();

module.exports = (db, user) => {
  router.get("/", (req, res) => {
    // const user = users[req.session.user_id]
    db.query(`
    SELECT lists.title, lists.id, items.name
    FROM lists
    JOIN items ON list_id = lists.id
    JOIN users ON user_id = users.id
    WHERE users.id = $1;
    `, [user])
    .then(data => {
      const list = data.rows;
        res.json({ list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
