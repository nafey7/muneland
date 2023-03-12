const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const membershipSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    cost: {
        type: String
    },
    icons: {
        type: Array,
        default: []
    },
    numberOfQuestions: {
        type: Array,
        default: []
    },
    features: {
        type: Array,
        default: []
    },
    deliverables: {
        type: Array,
        default: []
    }
}

);

const Membership = mongoose.model('Membership', membershipSchema);
module.exports = Membership;