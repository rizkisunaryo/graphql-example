const graphql = require("graphql");

const MemberType = new graphql.GraphQLObjectType({
  name: "Member",
  fields: {
    id: { type: graphql.GraphQLInt },
    firstName: { type: graphql.GraphQLString },
    lastName: { type: graphql.GraphQLString },
    role: { type: graphql.GraphQLString },
    skills: { type: graphql.GraphQLList(graphql.GraphQLString) },
    dateJoined: { type: graphql.GraphQLFloat },
    avatarImage: { type: graphql.GraphQLString },
    bio: { type: graphql.GraphQLString },
  },
});

module.exports = MemberType;
