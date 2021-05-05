const express = require("express");
const server = express();

const addCatPage = require("./src/routes/addCat");
const catNamePage = require("./src/routes/catName");
const homePage = require("./src/routes/home")
const logInPage = require("./src/routes/home./src/routes/logIn")
const signUpPage = require("./src/routes/signUp")


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`)});

