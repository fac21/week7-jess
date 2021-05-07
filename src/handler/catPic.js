const model = require("../../database/model");

function get(request, response) {
    const catId = request.params.catid;
    const cat = model.getCat(catId).then((cat) => {
        response.send(cat.picture);
    }).catch((error) => {
        console.error(error);
        response.send(`<h1>Something has gone wrong</h1><a href='/'>Back to Homepage</a>`);
    })
}

module.exports = {get };
