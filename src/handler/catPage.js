const html = require("../components/html");
const model = require("../../database/model");


function get(request, response) {
    const catId = request.params.catid;

    const cat = model.getCat(catId).then((cat) => {

        const catHtml = `
        <h1>Name This Cat!</h1>
        <img class="catPic" src='/cat-pic/${catId}' alt="catPicture" width="auto" height="300">
        <div class="cat-description">${cat.description}</div>
        <br>
        <form action="/cats/:catid" method="POST">
            <label for="cat_name">Suggest a name</label>
            <input type="text" id="cat_name" name="cat_name" required>
           <button type="submit">Submit</button>
        </form>
        <a href="/">Back to Homepage</a>

        `;
        response.send(catHtml);

    }).catch((error) => {
        console.error(error);
    })
}

// this post function does not work
// get name from cat_names table via cat_id from cat table, get user_id from session data
function post(request, response) {
    const { name } = request.body;

    const sid = request.signedCookies.sid;
    model
      .getSession(sid)
      .then((session) => model.getCatNameData(id))
      .then((result) => {
          console.log(result);

        model.createCatName(name);
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

module.exports = {get, post};
