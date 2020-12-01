const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // register
  router.post("/", (req, res) => {
    console.log("posted to...")
    const {email, password, username} = req.body;
    const userID = req.session["user_id"]
    console.log(req.body, email, password)
    if (userID) {
      console.log("user exists")
      // show error
    } else {
      db.query(`INSERT INTO users (email, password, username)
      VALUES ($1, $2, $3);`, [email, password, username])
      .then(input => {
        db.query(`SELECT * FROM users WHERE email=$1`, [email])
        .then(dbres => {
          console.log("USER: ", dbres)
          const user = dbres.rows[0]; // in this instance having [0] is okay bc we deteremined that there would only be 1 entry
          console.log("USER: ", user)
          // if match
          // set cookies
          req.session["user_id"] = user.id;
          console.log("ID: ", user.id)
          // redirect to list user homepage
          res.redirect("/")
        })
      })
    }
  });
  return router;
};