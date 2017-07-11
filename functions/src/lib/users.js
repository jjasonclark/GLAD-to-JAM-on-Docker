'use strict';

const { docPut } = require('../shared/dynamoDb');

function createUser(user) {
  return docPut({
    TableName: 'users',
    Item: user,
  }).then(() => user);
}

module.exports.createUser = createUser;
