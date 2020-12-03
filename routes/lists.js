const express = require('express');
const router = express.Router();

// const getListId = function(db, email) {
//   const sqlQuery = `
//   SELECT lists.id, lists.title
//   FROM lists
//   JOIN categories ON category_id = categories.id
//   WHERE categories.category ILIKE lists.title
//    ;
//   `;
//   const values = [email];
//   return db.query(sqlQuery, values)
// };

module.exports = (db) => {

  router.get("/:listID", (req, res) => {
    const userID = req.session["user_id"];
    const listID = req.params.listID;
   // console.log(listID, 'this is get route listID')
  //   console.log(req.session, "sesh")
    if (userID) {
      (db.query(`
      SELECT items.name, items.description, items.id AS item_id, lists.title, lists.id, users.username
      FROM lists
      JOIN items ON list_id = lists.id
      JOIN users ON user_id = users.id
      WHERE users.id = $1 AND list_id = $2
      ORDER BY items.id
      LIMIT 15;
      `, [userID, listID]))
        .then(data => {
          const lists = data.rows;
          const templateVars = { lists, userID, listID }
         // console.log(templateVars)
          res.render("list", templateVars)
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      res.redirect("/credentials")
    }
  })


// when you add an item it edits the list_id to correct id
  router.post("/:listID", (req, res) => {
    const userID = req.session["user_id"];
    const text = req.body.text;
   // console.log("post route listid is:", req.params)
    const listID = req.params.listID;
    db.query(`UPDATE items
    SET list_id = $1
    WHERE name ILIKE '%'||$2||'%';
    `, [listID, text])
    .then(item => {
      res.redirect(`/list/${listID}`)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  router.post("/:listID/delete/:id", (req, res) => {
    const userID = req.session["user_id"];
    const itemId = req.params.id;
    const listID = req.params.listID;
    db.query(`UPDATE items
    SET list_id = null
    WHERE id = $1;
    `,[itemId])
    .then(item => {

      // v change
      res.redirect(`/list/${listID}`)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  router.post("/:listID/fave/:id", (req, res) => {
    const userID = req.session["user_id"];
    const itemId = req.params.id;
    const listID = req.params.listID;
    db.query(`UPDATE items
    SET favourite = true
    WHERE id = $1
    `, [itemId])
    .then(item => {
      // v change
      res.redirect(`/list/${listID}`)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })
  return router;
};