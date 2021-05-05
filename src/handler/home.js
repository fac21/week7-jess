const html = require('../components/html');

function get(request, response) {

    response.send(html.getReusableHTML('hey'));
}

module.exports = { get }
