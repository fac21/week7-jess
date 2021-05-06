const html = require("../components/html");
const model = require("../../database/model");
const catPic = require("./catPic");

function get(request, response) {
    const catId = request.params.id;
    const catHtml = `
    <img class="catPick" src='/cat-pic/{$catId}' alt="catPicture">
    `;
    response.send(html.getReusableHTML(catHtml));
}

function post(request, response) {}

module.exports = {get, post };