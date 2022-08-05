const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const freelancerSchema = new Schema({

    fullName: {
        type: String,
        required: [true, 'Name is required']
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
    },
    nickName: {
        type: String,
        required: [true, 'Nick Name is required']
    },
    selfRating: {
        metaverse: {type: String, required: true},
        blockchain: {type: String, required: true},
        nft: {type: String, required: true}
    },
    quizScore: {
        type: Number,
        required: [true, 'Quiz Score is required']
    },
    freelancerRating: {
        type: Number,
        default: 0
    },
    schoolDegree: {
        type: String,
        default: ""
    },
    enterprisesMissions: {
        type: String,
        default: ""
    },
    certifications: {
        type: String,
        default: ""
    },
    cv: {
        type: String,
        default: ""
    },
    linkedin: {
        type: String,
        default: ""
    },
    video: {
        type: String,
        default: ""
    },
    biography: {
        type: String,
        default: ""
    }
    
},
 {
    timestamps: true
}

);

const Freelancer = mongoose.model('Freelancer', freelancerSchema);
module.exports = Freelancer;