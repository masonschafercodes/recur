const subscriptionsResolvers = require('./subscriptions');
const usersResolver = require('./users');

module.exports ={
    Query: {
        ...subscriptionsResolvers.Query,
    },
    Mutation: {
        ...usersResolver.Mutation,
        ...subscriptionsResolvers.Mutation,
    }
}