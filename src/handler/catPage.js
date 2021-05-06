const html = require("../components/html");
const model = require("../../database/model");
const catPic = require("./catPic");

function get(request, response) {
    const catId = request.params.catid;

    const cat = model.getCat(catId).then((cat) => {
    
        const catHtml = `
        <h1>Name This Cat!</h1>
        <img class="image--catPage catPic" src='/cat-pic/${catId}' alt="catPicture"npm>
        <div class="cat-description">${cat.description}</div>
        `;
        const htmlToSend = html.getReusableHTML(catHtml);       
        response.send(htmlToSend);

    }).catch((error) => {
        console.error(error);
    })
}


module.exports = {get};