//POA: css for page, refractoring, utilise default list maker, error handling for JS logic
// Do not delete logs
const bcrypt = require('bcrypt');
const express = require('express');
const router  = express.Router();
const { getUserByEmail, displayPublicLists } = require('./credHelpers.js');

module.exports = (db) => {

  router.get("/", (req, res) => {

    const userID = req.session["user_id"];
    if (!userID){
      (displayPublicLists(db))
      .then(data => {
        // console.log("USER: ", userID)
        const lists = data.rows;
        const templateVars = { lists, userID }
        res.render("credentials", templateVars)
        })
        .catch(err => {
          res
          .status(500)
          .json({ error: err.message })
        });
    } else {
      res.redirect("/");
    }
  });

  // login
  router.post("/", (req, res) => {
    // console.log("posted to...")
    const { email, password } = req.body;
    // console.log(req.body, email, password)
    getUserByEmail(db, email)
    .then(dbres => {
      if(dbres.rows.length === 0) {
        // ("no such user") redirect here (potentially with info as to why)
        console.log("ERROR: no such user");
        res.redirect("/credentials");
      } else {
        let user = dbres.rows[0]; // in this instance having [0] is okay bc we deteremined that there would only be 1 entry
        if (bcrypt.compareSync(password, user.password)) {
          // if match
          console.log("password worked");
          console.log("Logged in as: ", user.username, user.email, user.password);
          // set cookies
          req.session["user_id"] = user.id;
          // redirect to list user homepage
          res.redirect("/");
        } else {
          // same as 25 except with password error
          console.log("ERROR: no such password");
          res.redirect("/credentials");
        }
      }
    })
  });

  // Logout functionality
  router.post("/logout", (req, res) => {
    // console.log("POST RECEIVED")
    req.session = null;
    res.redirect("/credentials");
  });
  return router;
};
