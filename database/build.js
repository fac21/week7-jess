// Build the database during the tests
// read the contents of init.sql, so we can send it to our database as a query:

const fs = require("fs");
const path = require("path");
const db = require("./connection.js");

const initPath = path.join(__dirname, "init.sql"); //finds path of a file ie init.sql
const initSQL = fs.readFileSync(initPath, "utf-8"); //import

//function to access init.sql text content
function build() {
    return db.query(initSQL);
}

module.exports = build;