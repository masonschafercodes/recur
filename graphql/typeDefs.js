const gql = require('graphql-tag');

module.exports = gql`
    type Subscription {
        id: ID!
        subscriptionName: String!
        username: String!
        price: Float!
        createdAt: String!
        isSuspended: Boolean!
        firstPayment: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query {
        getSubscriptions: [Subscription]
        getSubscription(id: ID!): Subscription
        getUserSubscriptions(username: String!): [Subscription]
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!

        createSubscription(subscriptionName: String!, price: Float!, firstPayment: String!): Subscription!
        deleteSubscription(id: ID!): String!
        updateSubscriptionSuspenion(id: ID!, isSuspended: Boolean!): Subscription!
    }
`