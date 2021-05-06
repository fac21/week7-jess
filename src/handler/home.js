const html = require('../components/html');
const model = require("./../../database/model");


function get(request, response) {
    const sid = request.signedCookies.sid;
    let homePageHtml;

    if (sid) {
        const getUserData = model.getSession(sid)
        const getCatData = model.getCatData();

        Promise.all([getUserData, getCatData])
        .then((values) => {
            const userName = values[0].user.name;
            const getCatsData = values[1];
            console.log("userName", userName)
            console.log("getCatsData", getCatsData)

            homePageHtml = `
            <h1>Hello ${userName}</h1>
            <form action="/log-out" method="POST">
                <button>Log out</button>
            </form>

            <ul>
            ${getCatsData.map(cat_img => 
            ` <li>
                <a href="/cats/${cat_img.id}"><img src="/cat-pic/${cat_img.id}" alt="" width="64" height="64"></a>
              </li>
            `).join("")}
            </ul> 

            <p> Get your cat named by the cat-loving community!</p>
            <a href="/add-cat">Add a cat to be named</a>
            `;
   
            response.send(html.getReusableHTML(homePageHtml)); // repetition of below, refactor later
        })
        .catch((error) => {
            console.error("error", error);
            response.send(`<h1>Something has gone wrong! :(</h1>`);
        });
    } else {
        homePageHtml = `
        <h1>Hello cat lover!</h1>
        <a href="/sign-up">Sign up</a>
        <span> | </span>
        <a href="/log-in">Log in</a>
        ` 
        response.send(html.getReusableHTML(homePageHtml));
    }
}

module.exports = { get }
