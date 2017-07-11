'use strict';

const jwt = require('jsonwebtoken');
const { promisify } = require('./promises');
const { toUnixTime } = require('./dates');
const jwtSign = promisify(jwt.sign);
const algorithm = 'HS256';

// Extract and decode a JWT from cookie for an Event
// Returns a promise with success result of JWT
// Rejected promise returns { Error: `error` }
function createUserJWT(user, expires, secretCode) {
  return jwtSign({ uid: user.username, exp: toUnixTime(expires) }, secretCode, {
    algorithm,
  }).catch(error => Promise.reject({ Error: error }));
}

module.exports.createUserJWT = createUserJWT;
