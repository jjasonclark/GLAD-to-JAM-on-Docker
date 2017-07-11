'use strict';

const { dig } = require('../shared/utils');
const { docGet, docPut, docUpdate } = require('../shared/dynamoDb');

function getUser(username) {
  return docGet({ TableName: 'users', Key: { username } }).then(response => dig(response, 'Item'));
}

function updateLastSignOn(user) {
  const item = Object.assign({}, user, {
    lastSignOn: new Date().toISOString(),
  });
  return docUpdate({
    TableName: 'users',
    Key: { username: item.username },
    UpdateExpression: 'set lastSignOn = :signOn',
    ExpressionAttributeValues: {
      ':signOn': item.lastSignOn,
    },
  }).then(() => item);
}

function createUser(user) {
  return docPut({
    TableName: 'users',
    Item: user,
  }).then(() => user);
}

module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateLastSignOn = updateLastSignOn;
