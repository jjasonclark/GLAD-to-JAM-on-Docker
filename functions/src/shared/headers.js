const { dig } = require('./utils');

function lowerCaseKeyMap(source) {
  return Object.keys(source).reduce((memo, key) => {
    memo[key.trim().toLowerCase()] = key;
    return memo;
  }, {});
}

function extractValues(source, props) {
  const keys = lowerCaseKeyMap(source);
  return props.map(name => source[keys[name.trim().toLowerCase()]]);
}

function validateTypeHeaders(event, whichHeaders, type) {
  const headers = dig(event, 'headers') || {};
  const contentTypeHeaders = extractValues(headers, whichHeaders);
  return contentTypeHeaders.every(header =>
    header.split(';').map(item => item.trim().toLowerCase()).includes(type)
  );
}

module.exports.validateTypeHeaders = validateTypeHeaders;
