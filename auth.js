const model = require("./database/model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// will export so cookie can be set in diff places
const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 600000,
    sameSite: "strict",
    signed: true,
};

function createUser(email, password, name) {
    return bcrypt
        .hash(password, 10)
        .then((hash) => model.createUser(email, hash, name));
}