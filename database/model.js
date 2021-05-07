const db = require("./connection");

function createUser(name, email, password) {
    const INSERT_USER = `
  INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
  RETURNING id, email, name;
  `;
    return db
        .query(INSERT_USER, [name, email, password])
        .then((result) => result.rows[0]);
}

function createSession(sid, data) {
    const INSERT_SESSION = `
  INSERT INTO sessions (sid, data) VALUES ($1, $2)
  RETURNING sid;`;

    return db
        .query(INSERT_SESSION, [sid, data])
        .then((result) => result.rows[0].sid);
}

function getSession(sid) {
    const SELECT_SESSION = "SELECT data FROM sessions WHERE sid=$1";
    return db.query(SELECT_SESSION, [sid]).then((result) => {
        const singleResult = result.rows[0];
        return singleResult && singleResult.data;
    });
}

function getUser(email) {
    const selectUser = `
    SELECT * FROM users WHERE email=$1;`;
    return db.query(selectUser, [email]).then((result) => {
        return result.rows[0];
    });
}

function getCat(id) {
    const selectCat = `
    SELECT * FROM cats WHERE id=$1;`;
    return db.query(selectCat, [id]).then((result) => {
        return result.rows[0];
    });
}

function createCatName(name, cat_id) {
const INSERT_NAME = `INSERT INTO cat_names (name, cat_id, created_at) VALUES ($1, $2,(SELECT CURRENT_TIMESTAMP))
  RETURNING name, created_at`;
  console.log('createCatName',name)
  return db.query(INSERT_NAME, [name, cat_id]);
}

function getCatNameData(id) {
  const SELECT_CAT_NAME = `
  SELECT * FROM cat_name WHERE id=$1;
  `;
  return db.query(SELECT_CAT_NAME, [id]).then((result) => {
    return result.rows[0];
  });
}

function createCat(picture, description, user_id) {
    const INSERT_CAT = `
  INSERT INTO cats (picture, description, user_id, created_at) VALUES ($1, $2, $3, (SELECT CURRENT_TIMESTAMP))`;
    return db.query(INSERT_CAT, [picture, description, user_id]);
}

 function getCatData(){
  const GET_CAT_IMG = `SELECT * FROM cats;`
  return db.query(GET_CAT_IMG)
  .then((result) => {
    return result.rows})
 }

function deleteSession(sid) {
    const DELETE_SESSION = "DELETE FROM sessions WHERE sid=$1";
    return db.query(DELETE_SESSION, [sid]);
}

module.exports = {
  getCat,
  getCatData,
  createCatName,
getCatNameData,
  getUser,
  getSession,
  deleteSession,
  createUser,
  createSession,
  createCat,
};
