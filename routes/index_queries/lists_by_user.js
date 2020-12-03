const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session["user_id"];
    if (userID) {
      (db.query(`
      SELECT lists.title, lists.id, items.name, users.username
      FROM lists
      JOIN items ON list_id = lists.id
      JOIN users ON user_id = users.id
      WHERE users.id = $1;
     `, [userID]))
        .then(data => {
          const lists = data.rows;
          const templateVars = { lists, userID }
          res.render("index", templateVars)
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      // res redirect to credentials
      res.redirect("/api/credentials")
      }
  });
  return router;
};
