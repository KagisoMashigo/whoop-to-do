const axios = require('axios');
const express = require('express');
// const items = require('../items');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const { name, description } = req.body;
     axios({
        method: "GET",
        url: "https://developers.zomato.com/api/v2.1/search?entity_id=1",
     headers: {
    "user-key": "372e830f744fa65e5fa9300bdc5b0ca4",
     "content-type": "application/json"
    }
    })
      // db.query(`SELECT * FROM items WHERE list_id = 3;`
      //     `INSERT INTO items (name, descritption, cuisine)
      //   VALUES ($1, $2, $3);
      //   `
      //   )
      .then(dbres => {
        // last step if all goes well
        res.json( {
          name: dbres.data.restaurants[0].restaurant.name,
          description: dbres.data.restaurants[0].restaurant.cuisines        })
        //res.redirect("/list")
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  })
  return router;

}
