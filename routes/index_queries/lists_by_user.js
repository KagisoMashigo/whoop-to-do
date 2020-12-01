const express = require('express');
const router  = express.Router();

const userListDB = function(id, db) {
  let userDB = {};
  for (let item in db) {
    if (id === db[item].userID) {
      userDB[item] = db[item];
    }
  }
  return userDB;
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session["user_id"];
    // const user = users[req.session.user_id]
    db.query(`
    SELECT lists.title, lists.id, items.name
    FROM lists
    JOIN items ON list_id = lists.id
    JOIN users ON user_id = users.id
    WHERE users.id = $1;
    `, [userID])
    .then(data => {
      const list = data.rows;
      const templateVars = { list: list }
      res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};



// if (userID) {
//   (db.query(`
//   // querry to show user list
//  `, [userID]))
//     .then(data => {
//       const lists = data.rows;
//       const templateVars = { lists: lists }
//       res.render("index", templateVars)
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// } else {
//   res.redirect("/api/credentials")
// }

