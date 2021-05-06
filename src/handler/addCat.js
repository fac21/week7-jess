const html = require("../components/html");

function get(request, response) {
    const addCatHtml = `
    <h1>Add your cat's details below</h1>
     <form action="/add-cat" method="POST" enctype="multipart/form-data">
        <label for="cat_photo">My cat</label>
        <input type="file" id="cat_photo" name="cat_photo">
        <label for="description">Add a brief description about your cat</label>
        <textarea rows="4" cols="50" id="description" name="description" auto-focus required placeholder="E.g. breed, age, temperament"></textarea>
        <button type="submit">Add</button>
     </form>
    <a href="/">Back to home page</a>
    `;
    response.send(html.getReusableHTML(addCatHtml));
}

function post(request, response) {}

module.exports = {get, post };