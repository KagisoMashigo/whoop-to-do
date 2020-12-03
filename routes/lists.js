const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // app.get("/urls/:shortURL", (req, res) => {
  //   const user = users[req.session.user_id];
  //   const shortURL = req.params.shortURL;
  //   const templateVars = {
  //     user,
  //     shortURL,
  //     longURL: urlDatabase[shortURL].longURL
  //   };
  //   if (!user) {
  //     res.render("error_login", templateVars);
  //   }
  //   res.render("urls_show", templateVars);
  // });

  router.get("/:listID", (req, res) => {
    const userID = req.session["user_id"]
    const listID = req.params.listID;
  //   console.log(req.session, "sesh")
    if (userID) {
      (db.query(`
      SELECT items.name, items.description, items.id, lists.title, lists.id, users.username
      FROM lists
      JOIN items ON list_id = lists.id
      JOIN users ON user_id = users.id
      WHERE users.id = $1 AND list_id = $2;
      `, [userID, listID]))
        .then(data => {
          const lists = data.rows;
          const templateVars = { lists, userID, listID }
          console.log(templateVars)
          res.render("list", templateVars)
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      res.redirect("/api/credentials")
    }
  })


// when you add an item it edits the list_id to correct id
  router.post("/", (req, res) => {
    const userID = req.session["user_id"];
    const text = req.body.text;

    // change hardcoded
    const listID = req.params.listID;
    db.query(`UPDATE items
    SET list_id =$1
    WHERE name ILIKE '%'||$2||'%'
    `, [listID, text])
    .then(item => {

      // v change
      res.redirect("/lists")
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  router.post("/delete/:id", (req, res) => {
    const userID = req.session["user_id"];
    const itemId = req.params.id;
    db.query(`UPDATE items
    SET list_id = null
    WHERE id = $1;
    `,[itemId])
    .then(item => {

      // v change
      res.redirect("/lists")
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  router.post("/fave/:id", (req, res) => {
    const userID = req.session["user_id"];
    const itemId = req.params.id;
    db.query(`UPDATE items
    SET favourite = true
    WHERE id = $1
    `, [itemId])
    .then(item => {
      // v change
      res.redirect("/lists")
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })
  return router;
};


