'use strict';

const { graphql } = require('graphql');
const { dig } = require('../shared/utils');
const { validateTypeHeaders } = require('../shared/headers');
const { extractVerifiedJWT } = require('../shared/jwt');
const { schema } = require('./schema');
const secretCode = 'secret';
const notAcceptableResponse = {
  statusCode: 406,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'plain/text',
    'Content-Length': 0,
  },
  body: null,
};

function processRequest(event, opertationName, query, queryParams, callback) {
  return extractVerifiedJWT(event, secretCode)
    .then(jwt => ({
      username: jwt.decoded.uid,
      headers: event.headers,
      jwt,
    }))
    .then(queryContext => graphql(schema, query, {}, queryContext, queryParams, opertationName))
    .then(response => callback(null, jsonResponse(response, 200)))
    .catch(error => callback(null, jsonResponse(error, 400)));
}

function jsonResponse(response, statusCode) {
  const body = JSON.stringify(response);
  return {
    statusCode,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'Content-Length': Buffer.byteLength(body),
    },
    body,
  };
}

function hasValidContentTypes(event) {
  return validateTypeHeaders(event, ['Content-Type', 'Accept'], 'application/json');
}

module.exports.get = (event, context, callback) => {
  if (!hasValidContentTypes(event)) {
    callback(null, notAcceptableResponse);
    return;
  }

  const query = dig(event, 'queryStringParameters', 'query') || '';
  const variables = dig(event, 'queryStringParameters', 'variables') || {};
  const opertationName = dig(event, 'queryStringParameters', 'opertationName') || '';

  processRequest(event, opertationName, query, variables, callback);
};

module.exports.post = (event, context, callback) => {
  if (!hasValidContentTypes(event)) {
    callback(null, notAcceptableResponse);
    return;
  }

  const { query = '', variables = {}, opertationName = '' } = JSON.parse(event.body);

  processRequest(event, opertationName, query, variables, callback);
};
