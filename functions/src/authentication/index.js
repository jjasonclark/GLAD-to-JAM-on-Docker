'use strict';

const bcrypt = require('bcryptjs');
const { daysFromNow } = require('../shared/dates');
const { isBlank } = require('../shared/utils');
const { createUserJWT } = require('../shared/jwt');
const { createUser } = require('../lib/users');

const domain = 'localhost';
const rootUrl = `http://${domain}:8080`;
const signUpUrl = `${rootUrl}/signup`;
const loginDays = 14;
const saltLength = 3;
const secretCode = 'secret';

function createCookie(jwt, expire, domain) {
  return `JWT=${encodeURIComponent(jwt)}; Domain=${domain}; Expires=${expire.toGMTString()}; HttpOnly`;
}

function createErrorCookie(message, domain) {
  return `Error=${encodeURIComponent(message)}; Domain=${domain}`;
}

function createRedirect(where, cookie) {
  return {
    statusCode: 302,
    headers: {
      'Content-Type': 'plain/text',
      'Cache-Control': 'no-cache',
      Location: where,
      'Set-Cookie': cookie,
      'Content-Length': Buffer.byteLength(where),
    },
    body: where,
  };
}

function returnCreatedJWT(user, callback) {
  return createUserJWT(user, daysFromNow(loginDays), secretCode)
    .then(userToken => createCookie(userToken, daysFromNow(loginDays), domain))
    .then(cookie => createRedirect(rootUrl, cookie))
    .then(result => callback(null, result));
}

module.exports.signup = (event, context, callback) => {
  const { username, password, passwordConfirmation } = JSON.parse(event.body);

  if (isBlank(username)) {
    callback(null, createRedirect(signUpUrl, createErrorCookie('Username is blank', domain)));
    return;
  }

  if (passwordConfirmation !== password) {
    callback(
      null,
      createRedirect(
        signUpUrl,
        createErrorCookie('Password and password confirmation do not match', domain)
      )
    );
    return;
  }
  const now = new Date();

  bcrypt
    .hash(password, saltLength)
    .then(password =>
      createUser({
        username,
        password,
        createdAt: now.toISOString(),
        lastSignOn: now.toISOString(),
      })
    )
    .then(user => returnCreatedJWT(user, callback))
    .catch(error => {
      console.error(error);
      callback(null, createRedirect(signUpUrl, createErrorCookie(error, domain)));
    });
};