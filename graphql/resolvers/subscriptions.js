const { AuthenticationError } = require("apollo-server");

const Subscription = require('../../models/Subscription');
const checkAuth = require('../../utils/check-auth');

module.exports = { 
    Query: {
        async getSubscriptions() {
            try {
                const subscriptions = await Subscription.find();
                return subscriptions;
            } catch (error) {
                throw new Error(error);
            }
        },

        async getSubscription(_, { id }) {
            try {
                const subscription = await  Subscription.findById(id);
                if (subscription){
                    return subscription;
                } else {
                    throw new Error('Subscription not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async getUserSubscriptions(_, { username }, context) {
            const user = checkAuth(context);

            try {
                const subscriptions = await Subscription.find({ username });
                return subscriptions;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async createSubscription(_, { subscriptionName, price, firstPayment }, context) {
        
            const user = checkAuth(context);
            if (subscriptionName.trim() === '') {
                throw new Error('Subscription name must not be empty');
            }

            const newSubscription = new Subscription({
                subscriptionName,
                price,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
                isSuspended: false,
                firstPayment: new Date(firstPayment).toISOString(),
            });

            const subscription = await newSubscription.save();

            return subscription;
        
        },
        async deleteSubscription(_, { id }, context) {
            const user = checkAuth(context);

            try {
                const subscription = await Subscription.findById(id);
                if (user.username === subscription.username) {
                    await subscription.delete();
                    return 'Subscription deleted';
                } else {
                    throw new AuthenticationError('You are not authorized to delete this subscription');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async updateSubscriptionSuspenion(_, { id, isSuspended }, context) {
            const user = checkAuth(context);

            try {
                const subscription = await Subscription.findById(id);
                if (user.username === subscription.username) {
                    subscription.isSuspended = isSuspended;
                    await subscription.save();
                    return subscription;
                } else {
                    throw new AuthenticationError('You are not authorized to update this subscription');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}