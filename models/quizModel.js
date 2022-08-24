const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const quizSchema = new Schema({
    question: {
        type: String
    },
    choices: {
        type: Array,
        default: []
    },
    answer: {
        type: String
    }
},
 {
    timestamps: true
}

);

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;