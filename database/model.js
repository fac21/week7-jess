
const db = require("./connection");

function createUser(name, email, password) {
  const INSERT_USER = `
  INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
  RETURNING id, email, name;
  `
  return db.query(INSERT_USER, [name, email, password])
  .then((result) => result.rows[0])
}

function createSession(sid, data){
  const INSERT_SESSION = `
  INSERT INTO sessions (sid, data) VALUES ($1, $2)
  RETURNING sid;`

  return db.query(INSERT_SESSION, [sid, data])
  .then((result) => result.rows[0].sid)
}

function getUser(email) {
  const selectUser = `
    SELECT * FROM users WHERE email=$1;`;
  return db.query(selectUser, [email]).then((result) => {
      return result.rows[0];
    });
  }

 function deleteSession(sid) {
   const DELETE_SESSION = "DELETE FROM sessions WHERE sid=$1";
   return db.query(DELETE_SESSION, [sid]);
 }


module.exports = { getUser, deleteSession, createUser, createSession };
