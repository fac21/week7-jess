const auth = require("../../auth");
const templates = require("../components/html");

function get(request, response) {
    const loginForm = `
    <h1>Log in</h1>
    <form action="log-in" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button type="submit">Log in</button>
    </form>
    `;
    const html = templates.getReusableHTML(loginForm);
    response.send(html);
}

function post(request, response) {
    const { email, password } = request.body;
    auth
        .verifyUser(email, password)
        .then(auth.saveUserSession)
        .then((sid) => {
            response.cookie("sid", sid, auth.COOKIE_OPTIONS);
            response.redirect("/");
        })
        .catch((error) => {
            console.error("error", error);
            response.send(`<h1>User not found!</h1>`);
        });
}

module.exports = {get, post };