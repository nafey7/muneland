const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const reviewSchema = new Schema({
    
    freelancerID: {
        type: String
    },
    freelancerName: {
        type: String
    },
    freelancerImage: {
        type: String
    },
    reviewToFreelancer: {
        type: String
    },
    ratingToFreelancer: {
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
    reviewToClient: {
        type: String
    },
    ratingToClient: {
        type: String
    },
},
 {
    timestamps: true
}

);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;