const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const path = require("path");
const QueryType = require("./server/graphqlTypes/QueryType");

const schema = new graphql.GraphQLSchema({
  query: QueryType,
});

const app = express();

app.use(express.static("public"));
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get("/client*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "client.html"));
});

app.listen(4000);

console.log("Running a GraphQL API server at localhost:4000/api");
