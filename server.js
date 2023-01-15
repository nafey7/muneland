const express = require('express');
const dotenv = require('dotenv')
dotenv.config({path: './config.env'});
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const freelancerRoute = require('./routes/freelancerRoute');
const clientRoute = require('./routes/clientRoute');
const quizRoute = require('./routes/quizRoute');
const membershipRoute = require('./routes/membershipRoute');

const app = express();

const whitelist = ['http://localhost:3000'];
const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {origin: true} // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = {origin: false} // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

mongoose.connect(process.env.dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log("Sucessfully connected to Database"))
    .catch((err) => console.log(err));


app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    let req_time = new Date().toISOString();
    console.log('The time of the request:', req_time);
    req.body.timeApi = req_time;
    // console.log(req.headers);
    next();
});

app.use('/freelancer', freelancerRoute);
app.use('/client', clientRoute);
app.use('/quiz', quizRoute);
app.use('/membership', membershipRoute);

const port = 3001;
app.listen(port, () => {
    console.log("App is running on port:", port);
});
