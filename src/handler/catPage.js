const html = require('../components/html');
const model = require('../../database/model');

function get(request, response) {
  const catId = request.params.catid;

  const cat = model
    .getCat(catId)
    .then((cat) => {
      const catHtml = `
        <h1>Name This Cat!</h1>
        <img class="image--catPage catPic" src='/cat-pic/${catId}' alt="catPicture">
        <div class="cat-description">${cat.description}</div>
        <br>
        <form action="/cats/:catid" method="POST">
            <label for="cat_name">Suggest a name</label>
            <input type="text" id="cat_name" name="cat_name" required>
           <button type="submit">Submit</button>
        </form>
        <a href="/">Back to Homepage</a>
        <section>

        <section>
        `;

      const htmlToSend = html.getReusableHTML(catHtml);
      response.send(htmlToSend);
    })
    .catch((error) => {
      console.error(error);
    });
}


function post(request, response) {
    const name  = request.body.cat_name;
    const catId = request.params

    return model.createCatName(name, catId)
        .then(() => {
        response.redirect('/cats/:catid');
    })
      .catch((error) => {
        console.error('error', error);
        response.send(
            `<h1>Unable to post cat name! :(</h1><a href="/">Back to Homepage</a>`
        );
    });

  }

module.exports = { get, post };
