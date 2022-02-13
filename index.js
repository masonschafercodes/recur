const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const {MONGODB} = require('./config.js');

const server = new ApolloServer({ typeDefs, resolvers, plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ], context: ({req}) => ({ req }) });

mongoose.connect(MONGODB, { useNewUrlParser: true })
.then(() => {
    console.log('Connected to MongoDB');
    return server.listen({ port: 5000 });
})
.then(({ url }) => {
    console.log(`Server ready at ${url}`);
});