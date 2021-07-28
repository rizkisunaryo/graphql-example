const graphql = require("graphql");

const MemberType = require("./MemberType");
const members = require("../../members.json");

const QueryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    members: {
      type: new graphql.GraphQLList(MemberType),
      resolve: () => {
        const membersClone = [...members];
        membersClone.sort((a, b) => a?.dateJoined - b?.dateJoined);
        return membersClone;
      },
    },
    member: {
      type: MemberType,
      args: {
        id: { type: graphql.GraphQLInt },
      },
      resolve: (_, { id }) => members.find((el) => el.id === id),
    },
  },
});

module.exports = QueryType;
