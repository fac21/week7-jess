const html = require('../components/html');
const model = require('../../database/model');

const MAX_SIZE = 1000 * 1000 * 5; // 5 megabytes
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

function get(_request, response) {
  const addCatHtml = `
    <h1>Add your cat's details below</h1>
     <form class="stack-sm" action="/add-cat" method="POST" enctype="multipart/form-data">
        <label for="cat_photo">Add a cat photo:</label>
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
  const file = request.file;
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    response
      .status(400)
      .send(
        '<h1>File upload error</h1><p>Please upload an image file</p><a href="/add-cat">Try uploading again</a>'
      );
  }
  if (file.size > MAX_SIZE) {
    response
      .status(400)
      .send(
        '<h1>File upload error</h1><p>Picture must be < 5MB</p><a href="/add-cat">Try uploading again</a>'
      );
  } else {
    const { description } = request.body;
    // see user log in - create cat
    // @TODO- add middleware.checkAuth --> LATER
    const sid = request.signedCookies.sid;
    model
      .getSession(sid)
      .then((session) => model.getUser(session.user.email))
      .then((user) => {
        model.createCat(file.buffer, description, user.id);
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
}

module.exports = { get, post };
