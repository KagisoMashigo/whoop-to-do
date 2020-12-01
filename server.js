// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const
ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const credRoutes = require("./routes/credentials");

const listsRoutes = require("./routes/lists");
const categoriesRoutes = require("./routes/categories");
const itemsRoutes = require("./routes/items");
const querriesRoutes = require("./routes/list_querries");

// added by emtupp
const getListByUser = require("./routes/index_queries/lists_by_user_db");
const renderIndex = require("./routes/index_queries/lists_by_user");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/lists", listsRoutes(db));
app.use("/api/categories", categoriesRoutes(db));
app.use("/api/items", itemsRoutes(db));
app.use("/api/list1", querriesRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/api/credentials", credRoutes(db));

// added by emtupp
app.use("/api/userlist", getListByUser(db));
app.use("/", renderIndex(db));


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// get request for homepage when logged in
// app.get("/", (req, res) => {
//   res.render("index");
// });

// posts for "/"

// get request for list:id
app.get("/list:id", (req, res) => {
  res.render("list");
});

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

// <!-- <% for(let url in urls) { %>
//   <tr>
//     <td><%= url %></td>
//     <td><%= urls[url].longURL %></td>
//     <td><a href="/urls/<%= url %>/">EDIT</a></td>
//     <td><form method="POST" action="/urls/<%= url %>/delete"> <button>DELETE</button></form></td>
//   </tr>
// <% } %> -->



// get request for register
// app.get("/credentials", (req, res) => {
//     // const userID = req.session["user_id"];
//   // const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], user: users[userID] };
//   res.render("credentials");
// });

// When someone presses register
// it will post all info from the form to the db and add them
// it will then redirect them to index that contains lists


// SIGNED OUT
// / is a GET
// /login needs a POST
// /register needs a POST

// ** all need to be redirected if logged out**
// SIGNED IN
// /logout needs a POST
// /update needs a PUT  (profile)
// /create needs a POST (and redirect TO /posts/:ID)
// /posts/:ID needs a GET and a DELETE and a PUT


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
