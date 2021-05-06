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

            console.log(getCatsData)

            homePageHtml = `
            <h1>Hello ${userName}</h1>
            <form action="/log-out" method="POST">
                <button>Log out</button>
            </form>

            <ul>
            ${getCatsData.map(cat_img => 
            ` <li>
                <img src="/cats/${cat_img.id}/cat_photo" alt="" width="64" height="64">
              </li>
            `).join("")}
            </ul> 


            <a href="/add-cat">Add a cat to be named</a>
            <p> Get your cat named by the cat-loving community!</p>
            `
        // model.getSession(sid).then((data) => {
        // homePageHtml =
        // `
        // <h1>Hello ${data.user.name}</h1>
        // <form action="/log-out" method="POST">
        //     <button>Log out</button>
        // </form>
        // ` 
        // + viewCats()
        // link to add cats above?
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
