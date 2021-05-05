const db = require("./connection.js");

function getUser(email) {
    const selectUser = `
    SELECT id, email, password, name FROM users WHERE email=$1;`;
    return db.query(selectUser, [email]).then((result) => {
      return result.rows[0];
    });
  }

  function deleteSession(sid) {
    const DELETE_SESSION = "DELETE FROM sessions WHERE sid=$1";
    return db.query(DELETE_SESSION, [sid]);
  }
  

module.exports = { getUser, deleteSession };