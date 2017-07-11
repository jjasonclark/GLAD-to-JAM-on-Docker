'use strict';

const jwt = require('jsonwebtoken');
const { promisify } = require('./promises');
const { dig, isBlank } = require('./utils');
const { toUnixTime } = require('./dates');
const jwtVerify = promisify(jwt.verify);
const jwtSign = promisify(jwt.sign);
const tokenCookieKey = 'JWT';
const algorithm = 'HS256';

// Convert a cookie string into a map of keys
// Each record is a key and value seperated by a =
// Key/value pair are seperated by a ; to make the cookie string
function cookieToHash(cookie) {
  // split into pairs by ; then key/values by =
  const keyValuePairs = cookie.split(';').map(pair => pair.split('='));
  // reduce into hash
  return keyValuePairs.reduce((memo, [key, value]) => {
    memo[key.trim()] = value.trim();
    return memo;
  }, {});
}

// Extract the JWT token from the cookies from the incoming event
// Returns either blank or the JWT
function extractJWTCookie(event) {
  const cookie = dig(event, 'headers', 'Cookie') || '';
  if (isBlank(cookie)) {
    return '';
  }
  const cookieMap = cookieToHash(cookie);
  return cookieMap[tokenCookieKey] || '';
}

// Extract and decode a JWT from cookie for an Event
// Returns a promise with success result of { token: `raw JWT`, decoded: `decoded JWT` }
// Rejected promise returns { Error: `error` }
function extractVerifiedJWT(event, secretCode) {
  return Promise.resolve(event).then(extractJWTCookie).then(token => {
    if (isBlank(token)) {
      return Promise.reject({ Error: 'Access Denied' });
    }
    return jwtVerify(token, secretCode)
      .then(decoded => ({ token, decoded }))
      .catch(error => Promise.reject({ Error: error }));
  });
}

// Extract and decode a JWT from cookie for an Event
// Returns a promise with success result of JWT
// Rejected promise returns { Error: `error` }
function createUserJWT(user, expires, secretCode) {
  return jwtSign({ uid: user.username, exp: toUnixTime(expires) }, secretCode, {
    algorithm,
  }).catch(error => Promise.reject({ Error: error }));
}

module.exports.extractVerifiedJWT = extractVerifiedJWT;
module.exports.createUserJWT = createUserJWT;
