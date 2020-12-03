const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session["user_id"];
    if (userID) {
    db.query(`
    SELECT *
    FROM lists
    WHERE user_id = $1
    AND category_id = 2;
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
      res.redirect('/api/credentials')
    }
  });
  return router;
};
