const model = require("../../database/model");

function get(request, response) {
    const catId = request.params.catid;
    const cat = model.getCat(catId).then((cat) => {
        response.send(cat.picture);
    }).catch((error) => {
        console.error(error);
    })
}

module.exports = {get };