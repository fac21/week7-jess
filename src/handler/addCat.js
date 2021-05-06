const html = require('../components/html');
const model = require('../../database/model');

function get(request, response) {
  const addCatHtml = `
    <h1>Add your cat's details below</h1>
     <form action="/add-cat" method="POST" enctype="multipart/form-data">
        <label for="cat_photo">My cat</label>
        <input type="file" id="cat_photo" name="cat_photo" required>
        <label for="description">Add a brief description about your cat</label>
        <textarea rows="4" cols="50" id="description" name="description" auto-focus required placeholder="E.g. breed, age, temperament"></textarea>
        <button type="submit">Add</button>
     </form>
    <a href="/">Back to home page</a>
    `;
  response.send(html.getReusableHTML(addCatHtml));
}

function post(request, response) {
  const { picture, description } = request.body;

  // see user log in - create cat
  // @TODO- add middleware.checkAuth --> LATER
  const sid = request.signedCookies.sid;
  model
    .getSession(sid)
    .then((session) => model.getUser(session.user.email))
    .then((user) => {
      model.createCat(picture, description, user.id);
    })
    .then(() => {
      response.redirect('/');
    })
    .catch((error) => {
      console.error('error', error);
      response.send(
        `<h1>Unable to create cat post! :(</h1><a href="/">Back to Homepage</a>`
      );
    });
}

module.exports = { get, post };
