const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const clientSchema = new Schema({

    fullName: {
        type: String,
        required: [true, 'Name is required']
    },
    nickName: {
        type: String,
        required: [true, 'Nickname is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    telephoneNumber: {
        type: String,
        required: [true, 'Telephone Number is required']
    },
    emailAddress: {
        type: String,
        unique: [true, 'Account with this email is already registered'],
        required: [true, 'Email Address is required'],
        validate: [validator.isEmail, 'Please enter a valid Email Address']
    }
    
},
 {
    timestamps: true
}

);

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;