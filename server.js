const express = require("express");
const server = express();

const staticHandler = express.static("public");

const addCatPage = require("./src/handler/addCat");
const catNamePage = require("./src/handler/catName");
const homePage = require("./src/handler/home");
const logInPage = require("./src/handler/logIn");
const logOutPage = require("./src/handler/logOut");

const signUpPage = require("./src/handler/signUp");

// middleware - gets cookie header, parses into obj + attaches to request
const cookieParser = require("cookie-parser");

const bodyParser = express.urlencoded({ extended: false });

function logger(req, res, next) {
    const time = new Date().toLocaleTimeString();
    console.log(`${time} ${req.method} ${req.url}`);
    next();
}

// server.use((req, res) => {
// res.status(404).send('<h1>Not found</h1>');
// });

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(staticHandler);
server.use(logger);

// routes
server.get("/", homePage.get);

server.get("/sign-up", signUpPage.get);
server.post("/sign-up", bodyParser, signUpPage.post);

server.get("/log-in", logInPage.get);
server.post("/log-in", bodyParser, logInPage.post);
server.post("/log-out", bodyParser, logOutPage.post);

server.get("/add-cat", addCatPage.get);
server.post("/add-cat", bodyParser, addCatPage.post);

const PORT = process.env.PORT || 3000;

//Error-handling fail safe
process.on("unhandledRejection", (error) => {
    console.error(error);
    process.exit(1);
});

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});