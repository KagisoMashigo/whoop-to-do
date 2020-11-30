const express = require('express');
const router  = express.Router();

module.exports = (db, user) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT lists.title, items.name
    FROM lists
    JOIN items ON list_id = lists.id
    JOIN users ON user_id = users.id
    WHERE users.id = $1;
    `, [user])
    .then(data => {
      const list = data.rows;
      const templateVars = { list: list }
      res.render("index", templateVars);
      // res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
