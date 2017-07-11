const yaml = require('js-yaml');
const fs = require('fs');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB({
  region: 'docker-compose',
  endpoint: 'http://dynamodb:8000',
  accessKeyId: 'DOCKER_COMPOSE_ACCESS_KEY_ID',
  secretAccessKey: 'DOCKER_COMPOSE_SECRET_ACCESS_KEY',
  maxRetries: 0,
});

const errorHandler = tableName => (err, data) => {
  if (err != null) {
    console.log(`Error creating ${tableName}`);
    console.error(err);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
};

try {
  const doc = yaml.safeLoad(fs.readFileSync('serverless.yml', 'utf8'));
  const resources = doc.resources.Resources;
  const tables = Object.keys(resources)
    .filter(key => resources[key] != null && resources[key].Type === 'AWS::DynamoDB::Table')
    .map(key => resources[key].Properties);
  console.log(`Tables: ${JSON.stringify(tables.map(table => table.TableName), null, 2)}`);
  tables.forEach(table => dynamoDb.createTable(table, errorHandler(table.TableName)));
} catch (error) {
  console.error(error);
  process.exit(1);
}
