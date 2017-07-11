'use strict';

const { GraphQLObjectType, GraphQLString } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports.user = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    username: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLDateTime,
    },
    lastSignOn: {
      type: GraphQLDateTime,
    },
  },
});
