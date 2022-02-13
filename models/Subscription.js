const { model, Schema } = require('mongoose');

const subscriptionSchema = new Schema({
    subscriptionName: String, 
    username: String,
    price: Number,
    createdAt: String,
    isSuspended: Boolean,
    firstPayment: String,
    tags: [
        {
            tagName: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Subscription', subscriptionSchema);