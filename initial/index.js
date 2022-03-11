const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql``;

const resolvers = {};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {},
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
