  // Used to idetify users by email addy
  const getUserByEmail = function(db, email) {
    const sqlQuery = `
    SELECT * 
    FROM users
    WHERE email = $1;
    `;
    const values = [email];
    return db.query(sqlQuery, values)
  };

  const addUser = (db, email, hashedPassword, username) => {
    const sqlQuery = `
    INSERT INTO users (email, password, username)
    VALUES ($1, $2, $3);
    `;
    const values = [email, hashedPassword, username]
    return db.query(sqlQuery, values)
  }

  const displayPublicLists = (db) => {
    const sqlQuery = `
    SELECT lists.title, lists.id, items.name
    FROM lists
    JOIN items ON list_id = lists.id
    WHERE lists.public = true;
    `;
    return db.query(sqlQuery)
  }

module.exports = { getUserByEmail, displayPublicLists, addUser };
