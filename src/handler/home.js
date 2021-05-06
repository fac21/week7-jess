const html = require('../components/html');
const model = require("./../../database/model");

const catPicsHtml = `
<div class="cat-pics">
    <img src="#" alt="Generic cat pic">
</div>
<a href='/add-cat'>Add a cat</a>
<p> Get your cat named by the cat-loving community!</p>
`;

function get(request, response) {
    const sid = request.signedCookies.sid;
    let homePageHtml;
    if (sid) {
        model.getSession(sid).then((data) => {
        homePageHtml =
        `
        <h1>Hello ${data.user.name}</h1>
        <form action="/log-out" method="POST">
            <button>Log out</button>
        </form>
        `
        + catPicsHtml;
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
        + catPicsHtml;
        response.send(html.getReusableHTML(homePageHtml));
    }
}

module.exports = { get }
