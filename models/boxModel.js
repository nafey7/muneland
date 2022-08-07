const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const boxSchema = new Schema({

    freelancerID: {
        type: String,
        required: [true, 'Name is required']
    },
    cards: {
        type : Array ,
        "default" : [] 
    }
},
 {
    timestamps: true
}

);

const Box = mongoose.model('Box', boxSchema);
module.exports = Box;