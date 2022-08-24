const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

// status will of 3 types: in progress, soon ready, ready

const orderSchema = new Schema({
    freelancerID: {
        type: String
    },
    freelancerName: {
        type: String
    },
    freelancerImage: {
        type: String
    },
    clientID: {
        type: String
    },
    clientName: {
        type: String
    },
    clientImage: {
        type: String
    },
    orderDetails: {
        type: Schema.Types.Mixed
    },
    dueDate: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Pending"
    },
},
 {
    timestamps: true
}

);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;