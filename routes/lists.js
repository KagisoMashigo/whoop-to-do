const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const userID = req.session["user_id"]
     console.log(req.session, "sesh")
    if (userID) {
      (db.query(`
      SELECT items.name, items.description, items.id, lists.title, lists.id, users.username
      FROM lists
      JOIN items ON list_id = lists.id
      JOIN users ON user_id = users.id
      WHERE users.id = $1;
      `, [userID]))
        .then(data => {
          const lists = data.rows;
          // console.log("DATA:", lists)
          // res.json({ lists });
          const templateVars = { lists, userID }
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
    const listID = 1;
    console.log(req.body.text)
    db.query(`UPDATE items
    SET list_id =$1
    WHERE name ILIKE '%'||$2||'%';
    `, [listID, text])
    .then(item => {
      res.send(200)
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
      res.redirect("/lists")
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


  })
  // router.post("/", (req, res) => {
  //   req.session["user_id"] = null;
  //   res.redirect("/api/credentials");
  // });

  return router;
};



// router.get("/", (req, res) => {
//   db.query(`SELECT items.name, items.description, categories.category, users.username
//         FROM lists
//         JOIN items ON list_id = lists.id
//         JOIN categories ON category_id = categories.id
//         JOIN users ON user_id = users.id
//         WHERE lists.id = 2;
//         `, )
//     .then(data => {
//       const lists = data.rows;
//       // console.log("DATA:", lists)
//       // res.json({ lists });
//       const templateVars = { lists: lists }
//       res.render("list", templateVars)
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// return router;
// };


//   router.post("/", (req,res) => {
//    db.query(`INSERT INTO items (name, description, favourite, list_id)
//    VALUES
//    ('$1', '$2', false, $3);
//    `, [name, description, listid])





// res.redirect('/api/lists')
//  })




