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

module.exports = { createUser, createSession }