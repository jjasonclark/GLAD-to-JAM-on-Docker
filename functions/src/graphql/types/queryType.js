'use strict';

const { GraphQLObjectType, GraphQLString } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { user } = require('./userType');
const { dig } = require('../../shared/utils');
const { getUser } = require('../../lib/users');

module.exports.query = new GraphQLObjectType({
  name: 'Query',
  description: 'Base query',
  fields: {
    cookie: {
      type: GraphQLString,
      description: 'Cookie sent to server from your browser',
      resolve: (_obj, _args, context) => dig(context, 'headers', 'Cookie'),
    },
    me: {
      type: user,
      description: 'User record for the current user',
      resolve: (_obj, _args, context) => getUser(context.username),
    },
    test: {
      type: GraphQLString,
      description: 'A test value',
      resolve: () => 'test value',
    },
    now: {
      type: GraphQLDateTime,
      description: 'The current time and date',
      resolve() {
        return new Date();
      },
    },
  },
});
