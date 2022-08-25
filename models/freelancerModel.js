const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const freelancerSchema = new Schema({

    fullName: {
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
    nickName: {
        type: String
    },
    image: {
        type: String
    },
    selfRating: {
        metaverse: {type: String, required: true},
        blockchain: {type: String, required: true},
        nft: {type: String, required: true}
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
    },
    cost : {
        type: Array,
        "default" : []
    },
    minCost : {
        type: Number,
        default: 0
    },
    location : {
        type: String
    },
    industryNetwork : {
        type: String
    },
    language : {
        type: String
    },
    technology : {
        type: String
    },
    experience : {
        type: String
    },
    dateInfoUpdate: {
        type: String,
        default: ""
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
    }
    
},
 {
    timestamps: true
}

);

const Freelancer = mongoose.model('Freelancer', freelancerSchema);
module.exports = Freelancer;