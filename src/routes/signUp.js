const auth = require('../../auth');
const html = require('../components/html');

function getSignUpPage(request, response) {
  let mainContent = `
  <h1>Sign up</h1>
  <form action='/sign-up' method='POST'>
  <label for='name'>Name <span aria-hidden="true">*</span></label>
    <input type="name" id='name' name='name' required />
    <label for='email'>Email <span aria-hidden="true">*</span></label>
    <input type="email" id='email' name='email' required />
    <label for='password'>Password <span aria-hidden="true">*</span></label>
    <input type="password" id='password' name='password' required />
    <button>Submit</button>
  </form><br><br>
  <a href="/">Back to Homepage</a>
  `;

  response.send(html.getReusableHTML(mainContent));
}

function postSignUpPage(request, response) {}

module.exports = { getSignUpPage, postSignUpPage };
