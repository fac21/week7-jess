const express = require("express");
const server = express();

const addCatPage = require("./src/routes/addCat");
const catNamePage = require("./src/routes/catName");
const homePage = require("./src/routes/home");
const logInPage = require("./src/routes/home./src/routes/logIn");
const signUpPage = require("./src/routes/signUp");

// middleware - gets cookie header, parses into obj + attaches to request
const cookieParser = require("cookie-parser");

const bodyParser = express.urlencoded({ extended: false });

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(staticHandler);
const staticHandler = express.static("public");

server.use((req, res) => {
    res.status(404).send("<h1>Not found</h1>");
});

const PORT = process.env.PORT || 3000;

//Error-handling fail safe
process.on("unhandledRejection", (error) => {
    console.error(error);
    process.exit(1);
});

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});