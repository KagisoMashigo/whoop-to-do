  // Used to idetify users by email addy
  const getUserByEmail = function(db, email) {
    const sqlQuery = `
    SELECT *
    FROM users
    WHERE email = $1;
    `;
    const values = [email];
    return db.query(sqlQuery, values);
  };

  const addUser = (db, email, hashedPassword, username) => {
    const sqlQuery = `
    INSERT INTO users (email, password, username)
    VALUES ($1, $2, $3);`;
    const values = [email, hashedPassword, username];
    return db.query(sqlQuery, values);
  }

  const displayPublicLists = (db) => {
    const sqlQuery = `
    SELECT lists.title, lists.id, items.name
    FROM lists
    JOIN items ON list_id = lists.id
    WHERE lists.public = true;
    `;
    return db.query(sqlQuery);
  }

  const createMovies = (db, userID) => {
    console.log('checking function: ', userID)
    return db.query(`
    INSERT INTO lists (title, category_id, user_id)
    VALUES ('Movies', 1, $1);
    `,
    [userID]);
  }

  const createBooks = (db, userID) => {
    return db.query(`
    INSERT INTO lists (title, category_id, user_id)
    VALUES ('Books', 4, $1);
    `,
    [userID]);
  }

  const createRestaurants = (db, userID) => {
    return db.query(`
    INSERT INTO lists (title, category_id, user_id)
    VALUES ('Restaurants', 2, $1);
    `,
    [userID]);
  }

  const createProducts = (db, userID) => {
    return db.query(`
    INSERT INTO lists (title, category_id, user_id)
    VALUES ('Products', 3, $1);
    `,
    [userID]);
  }

module.exports = { getUserByEmail, displayPublicLists, addUser, createMovies, createBooks, createRestaurants, createProducts };
