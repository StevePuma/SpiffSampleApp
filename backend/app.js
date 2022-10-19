const express = require('express')
const cors = require("cors")
const app = express()
const jwt = require('jwt-simple');
const port = 5000
const dotenv = require('dotenv');
const url = require('url');
const cookieParser = require("cookie-parser");

var uuid = require('uuid');

app.use(cookieParser());

// get config vars
dotenv.config();

const sharedSecrets = {
  "https://new-trial.sisense.com": "e7a3e0c50b77a43f068a0cda037b53fabfce3a126a662165271631a4c294144a"
};

let token = '' //initialize this as a global token so it is accessible for login and logout destroy token.

function buildJwt(email, firstName, lastName, sisenseUrl) {

  let secret = '';
  if (sharedSecrets.hasOwnProperty(sisenseUrl)) {
    secret = sharedSecrets[sisenseUrl];
    console.log('Shared secret for ' + sisenseUrl + ': ' + secret);
  }
  else {
    console.log('Could not find matching shared secret for: ' + sisenseUrl);
    secret = '7aaef649b4de6e9d08702cb18428a8b2d2c18aa1d21978ba111004c7d009b532';
  }

  let payload;
  let jti = uuid.v4();
  let header = {
    typ: "JWT",
    alg: "HS256"

  };

  payload = {
    iat: Math.floor((new Date().getTime() / 1000)),
    //iat: 10000,
    email: email,
    firstName: firstName,
    lastName: lastName,
    jti: jti,
    // token will expire in 1 day from now
    exp: Math.floor((new Date().getTime() + 1440 * 60000) / 1000),
    //domain: "@sisense.com"

  };

  // encode token with payload

  let token = jwt.encode(payload, secret, algorithm = "HS256");
  return token;
}

app.get('/showcookies', function (request, response) {
  console.log("showcookies");
  let cookies = request.cookies;
  console.log(cookies);
  response.send(cookies);
});

app.get('/getsisensejwt', function (request, response) {
  console.log("getsisensejwt called");
  let email = request.cookies['email'];
  if (email) {
    console.log('found cookie: email = ' + email);
    let emailSplits = email.split(".");
    let firstName = request.cookies['firstName'];
    let lastName = request.cookies['lastName'];
    if (typeof firstName == "undefined") {
      firstName = emailSplits[0];
    }
    if (typeof lastName == "undefined") {
      lastName = emailSplits[1];
    }

    //TODO: hard coding needs removing - need to redirect based on referrer
    let query = url.parse(request.url, true).query;
    let returnTo = query['return_to'];
    let sisenseUrl = returnTo.substring(returnTo.indexOf('sisenseUrl=') + 11);
    console.log(sisenseUrl);
    let jwtToken = buildJwt(email, firstName, lastName, sisenseUrl);

    let redirect = sisenseUrl + '/jwt?jwt=' + jwtToken; //where ip or site name should be placed here

    if (query['return_to']) {
      redirect += '&return_to=' + encodeURIComponent(returnTo);
      console.log(redirect)
    }
    response.writeHead(302, {
      'Location': redirect
    });
    response.end();
  }
  else {
    console.log("No email cookie found");
    let redirect = request.headers.referer + 'auth/login';

    response.writeHead(302, {
      'Location': redirect
    });
    response.end();
  }

});

app.listen(port, () => {
  console.log(`Magpie backend listening on port ${port}`)
})
