const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("list");
  })

  router.get("/", (req, res) => {
        db.query(`SELECT items.name, items.description, categories.category, users.username
        FROM lists
        JOIN items ON list_id = lists.id
        JOIN categories ON category_id = categories.id
        JOIN users ON user_id = users.id
        WHERE lists.id = 2;
        `, )
      .then(data => {
        const lists = data.rows;
        // console.log("DATA:", lists)
        // res.json({ lists });
        const templateVars = {lists: lists}
        res.render("list", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

//   router.post("/", (req,res) => {
//    db.query(`INSERT INTO items (name, description, favourite, list_id)
//    VALUES
//    ('$1', '$2', false, $3);
//    `, [name, description, listid])





// res.redirect('/api/lists')
//   })
  return router;
};






