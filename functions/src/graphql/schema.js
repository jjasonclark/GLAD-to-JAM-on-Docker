'use strict';

const { GraphQLSchema } = require('graphql');
const { query } = require('./types/queryType');

module.exports.schema = new GraphQLSchema({ query });
