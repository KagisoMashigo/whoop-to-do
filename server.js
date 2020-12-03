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
const regRoutes = require("./routes/register");
const listsRoutes = require("./routes/lists");
const categoriesRoutes = require("./routes/categories");
const itemsRoutes = require("./routes/items");
// const apiRoutes = require("./routes/books");

// added by emtupp
const getListByUser = require("./routes/index_queries/lists_by_user_db");
const renderIndex = require("./routes/index_queries/lists_by_user");
const fetchBooksLists = require("./routes/nav_queries/nav_link_books");
const fetchFoodLists = require("./routes/nav_queries/nav_link_food");
const register = require('./routes/register');
const fetchProductLists = require("./routes/nav_queries/nav_link_products");
const fetchMovieLists = require("./routes/nav_queries/nav_link_movies");
const fetchMovieApi = require("./routes/api_requests/TMDb")


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/list", listsRoutes(db));
app.use("/api/categories", categoriesRoutes(db));
app.use("/api/items", itemsRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/credentials", credRoutes(db));
app.use("/register", regRoutes(db));

// app.use("/api/books", apiRoutes(db));

// added by emtupp
app.use("/api/userlist", getListByUser(db));
app.use("/", renderIndex(db));
app.use("/api/booklists", fetchBooksLists(db));
app.use("/api/foodlists", fetchFoodLists(db));
app.use("/api/productlists", fetchProductLists(db));
app.use("/api/movielists", fetchMovieLists(db));
app.use("/api/tmdblist", fetchMovieApi(db))

// app.use("/api/lists", getList(db));
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Whoop-To-Do server listening on port ${PORT} leggo!`);
});
