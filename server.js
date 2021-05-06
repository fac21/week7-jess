const express = require("express");
const server = express();

const staticHandler = express.static("public");

const addCatPage = require("./src/handler/addCat");
const catPage = require("./src/handler/catPage");
const homePage = require("./src/handler/home");
const logInPage = require("./src/handler/logIn");
const logOutPage = require("./src/handler/logOut");
const signUpPage = require("./src/handler/signUp");
const checkAuth = require("./src/middleware/checkAuth");
const catPic = require("./src/handler/catPic");

// middleware - gets cookie header, parses into obj + attaches to request
const cookieParser = require("cookie-parser");
const bodyParser = express.urlencoded({ extended: false });
const multer = require("multer");
const upload = multer();
const logger = require("./src/middleware/logger");

// server.use((req, res) => {
// res.status(404).send('<h1>Not found</h1>');
// });

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(staticHandler);
server.use(logger.logger);

// routes
server.get("/", homePage.get);

server.get("/sign-up", signUpPage.get);
server.post("/sign-up", bodyParser, signUpPage.post);

server.get("/log-in", logInPage.get);
server.post("/log-in", bodyParser, logInPage.post);

server.post("/log-out", bodyParser, logOutPage.post);

server.get("/add-cat", checkAuth.checkAuth, addCatPage.get);
server.post("/add-cat", upload.single("cat_photo"), addCatPage.post);

server.get("/:cat-id", catPage.get);
server.post("/cat", bodyParser, catPage.post);

server.get("/cat-pic/:cat-id", catPic.get);

const PORT = process.env.PORT || 3000;

//Error-handling fail safe
process.on("unhandledRejection", (error) => {
    console.error(error);
    process.exit(1);
});

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});