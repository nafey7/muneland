const express = require('express');
const dotenv = require('dotenv')
dotenv.config({path: './config.env'});
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const freelancerRoute = require('./routes/freelancerRoute');
const clientRoute = require('./routes/clientRoute');
const quizRoute = require('./routes/quizRoute');
const boxRoute = require('./routes/boxRoute');

const app = express();

// const corsOptions = {
//     origin: process.env.ORIGIN,
// }
// app.use(cors(corsOptions));

mongoose.connect(process.env.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Sucessfully connected to Database"))
    .catch((err) => console.log(err));


app.use(morgan('dev'));
app.use(express.json());

app.use((req,res,next) => {
    let req_time = new Date().toISOString();
    console.log('The time of the request:',req_time);
    req.body.timeApi = req_time;
    // console.log(req.headers);
    next();
});

app.use('/freelancer', freelancerRoute);
app.use('/client', clientRoute);
app.use('/box', boxRoute);
app.use('/quiz', quizRoute);

const port = process.env.PORT;
app.listen(port, ()=> {
    console.log("App is running on port:",port);
});