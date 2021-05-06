const model = require("../../database/model");

function get(request, response) {
    const catId = request.params.id;
    const cat = model.getCat(catId).then((cat) => {
        response.send(cat.picture);
    });
}

module.exports = {get };