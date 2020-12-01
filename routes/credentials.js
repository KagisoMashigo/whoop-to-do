/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

 // POA - 1: registation, logout, css for page, bcrypt

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("credentials")
  });
   
  // login
  router.post("/", (req, res) => {
    console.log("posted to...")
    const {email, password} = req.body;
    console.log(req.body, email, password)
    db.query(`SELECT * FROM users WHERE email=$1`, [email])
    .then(dbres => {
      if(dbres.rows.length === 0) {
        // ("no such user") redirect here (potentially with info as to why)
        console.log("no such user")
        res.redirect("/api/credentials");
      } else {
        let user = dbres.rows[0]; // in this instance having [0] is okay bc we deteremined that there would only be 1 entry
        if (user.password === password) {
          // if match
          // set cookies
          req.session["user_id"] = user.id;
          // redirect to list user homepage
          res.redirect("/api/lists")
        } else {
          // same as 25 except with password error
          console.log("no such password")
          res.redirect("/api/credentials");
        }
      }
    })
  });
  return router;
};
