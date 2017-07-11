'use strict';

const AWS = require('aws-sdk');
const { promisify } = require('./promises');

const dbSettings = {
    region: 'docker-compose',
    endpoint: 'http://dynamodb:8000',
    accessKeyId: 'DOCKER_COMPOSE_ACCESS_KEY_ID',
    secretAccessKey: 'DOCKER_COMPOSE_SECRET_ACCESS_KEY',
};

const dynamoDb = new AWS.DynamoDB(dbSettings);
const docClient = new AWS.DynamoDB.DocumentClient({ service: dynamoDb });
const docPut = promisify(docClient.put, docClient);

module.exports.docPut = docPut;
