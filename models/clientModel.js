const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const clientSchema = new Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    telephoneNumber: {
        type: String
    },
    emailAddress: {
        type: String,
        unique: [true, 'Account with this email is already registered'],
        validate: [validator.isEmail, 'Please enter a valid Email Address']
    },
    image: {
        type: String
    },
    reviews: {
        type: Array,
        "default" : []
    },
    ratingArray: {
        type: Array,
        "default" : []
    },
    testimonial : {
        type: String
    },
    plan : {
        type: String,
        default: ''
    }
    
},
 {
    timestamps: true
}

);

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;