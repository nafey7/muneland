const jwt = require('jsonwebtoken');

const Client = require ('../models/clientModel');
const Freelancer = require('../models/freelancerModel');
const Card = require('../models/cardModel');
const Order = require('../models/orderModel');
const Membership = require('../models/membershipModel');

exports.Signup = async (req,res) => {
    try{
        const query = Client.create({
            fullName: req.body.fullName,
            nickName: req.body.nickName,
            password: req.body.password,
            telephoneNumber: req.body.telephoneNumber,
            emailAddress: req.body.emailAddress,
            image: "default.jpg"

        });
        const clientSignup = await query;

        const token = jwt.sign({id: clientSignup._id}, 'muneland-secret');

        const querySecond = Freelancer.find().select('-selfRating -cost -createdAt -updatedAt -__v -password');
        const listFreelancers = await querySecond;

        const finalData = {client: clientSignup, freelancersList: listFreelancers};
        res.status(201).json({status: '201', message: 'success', token: token, data: finalData});    
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.Login = async (req,res) => {
    try{
        const query = Client.findOne({emailAddress: req.body.emailAddress, password: req.body.password}).select('-createdAt -updatedAt -__v');
        const findClient = await query;

        if (findClient == null){
            throw new Error('Enter a correct password')
        }

        const token = jwt.sign({id: findClient._id}, 'muneland-secret');

        const querySecond = Freelancer.find().select('-selfRating -cost -createdAt -updatedAt -__v -password');
        const listFreelancers = await querySecond;

        const finalData = {client: findClient, freelancersList: listFreelancers};

        res.status(200).json({status: '200', message: 'success', token: token, data: finalData});

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.ViewFreelancerProfile = async (req,res) => {
    try{
        // view cards that are used
        let finalCards = [];
        let cardS, cardE, cardL, obj, property;

        const query = Card.findOne({freelancerID: req.body.freelancerID}).select('-_id -__v -createdAt -updatedAt -freelancerID');
        const allCards = await query;

        cardS = allCards.strategyAndVision;
        cardE = allCards.entSolutionPlaybook;
        cardL = allCards.leadershipAndSocialization;

        for (let key in cardS){
            property = {};
            obj = {}
            if (cardS.hasOwnProperty(key)){
                property = cardS[key]
                if (property.status == 'Used'){
                    obj[key] = property;
                    finalCards.push(obj);
                }
            }
        }

        for (let key in cardE){
            property = {};
            obj = {}
            if (cardE.hasOwnProperty(key)){
                property = cardE[key];
                if (property.status == 'Used'){
                    obj[key] = property;
                    finalCards.push(obj);
                }
            }
        }

        for (let key in cardL){
            property = {};
            obj = {}
            if (cardL.hasOwnProperty(key)){
                property = cardL[key];
                if (property.status == 'Used'){
                    obj[key] = property;
                    finalCards.push(obj);
                }
            }
        }

        const querySecond = Freelancer.findOne({_id: req.body.freelancerID}).select('-createdAt -updatedAt -__v -ratingArray -cost -selfRating -password');
        const infoFreelancer = await querySecond;

        res.status(200).json({status: '200', message: 'success', data: {freelancer: infoFreelancer,cards: finalCards}});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.PlaceOrder = async (req,res) => {
    try{

        const freelancerQuery = Freelancer.findOne({_id: req.body.freelancerID}).select('image fullName');
        const infoFreelancer = await freelancerQuery;

        const clientQuery = Client.findOne({_id: req.body.clientID}).select('image fullName');
        const infoClient = await clientQuery;

        console.log(infoFreelancer);
        console.log(infoClient);

        const query = Order.create({
            freelancerID: req.body.freelancerID,
            freelancerName: infoFreelancer.fullName,
            freelancerImage: infoFreelancer.image,
            clientID: req.body.clientID,
            clientName: infoClient.fullName,
            clientImage: infoClient.image,
            orderDetails: req.body.orderDetails
        });
        const placeOrder = await query;

        res.status(201).json({status: '201', message: 'success'})
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.ViewOrders = async (req,res) => {
    try{
        const query = Order.find({clientID: req.body.clientID}).select('-clientName -clientImage -clientID -createdAt -updatedAt -__v');
        const viewOrders = await query;

        res.status(200).json({status: '200', message: 'success', data: viewOrders});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.AcceptSubmissionOrder = async (req,res) => {
    try{
        const query = Order.updateOne({_id: req.body.orderID, clientID: req.body.clientID}, {status: "Complete"}, {new: true, runValidators: true});
        const acceptSubmission = await query;

        res.status(200).json({status: '200', message: 'success'})
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.RequestIterationOrder = async (req,res) => {
    try{
        const query = Order.updateOne({_id: req.body.orderID, clientID: req.body.clientID}, {status: "In Progress"}, {new: true, runValidators: true});
        const requestIteration = await query;

        res.status(200).json({status: '200', message: 'success'})
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'})
    }
}

exports.Search = async (req,res) => {
    try{
        // leave testimonials for now

        let attribute = {};
        let filter = [];
        let filterLocation = []
        let query, findUser;

        if (req.body.fullName){
            attribute = {fullName: req.body.fullName};
            filter.push(attribute);
        }
        if (req.body.location){
            for (let i=0;i<req.body.location.length;i++){
                filterLocation.push({location: req.body.location[i]});
            }
        }
        if (req.body.industryNetwork){
            attribute = {industryNetwork: req.body.industryNetwork};
            filter.push(attribute);
        }
        if (req.body.language){
            attribute = {language: req.body.language};
            filter.push(attribute);
        }
        if (req.body.technology){
            attribute = {technology: req.body.technology};
            filter.push(attribute);
        }
        if (req.body.experience){
            attribute = {experience: req.body.experience};
            filter.push(attribute);
        }
        if (req.body.minCost){
            attribute = {minCost: req.body.minCost};
            filter.push(attribute);
        }
        // .select('-password -selfRating -cost -createdAt -updatedAt -__v')
        if (filter.length > 0 && filterLocation.length > 0){
            query = Freelancer.find().and(filter).or(filterLocation).select('-password -selfRating -cost -createdAt -updatedAt -__v -ratingArray');
            findUser = await query;
        }
        else if (filter.length > 0 && filterLocation.length == 0){
            query = Freelancer.find().and(filter).select('-password -selfRating -cost -createdAt -updatedAt -__v -ratingArray');
            findUser = await query;
        }
        else if (filter.length == 0 && filterLocation.length > 0){
            query = Freelancer.find().or(filterLocation).select('-password -selfRating -cost -createdAt -updatedAt -__v -ratingArray');
            findUser = await query;
        }
        

        res.status(200).json({status: '200', message: 'success', data: findUser});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.SubmitReview = async (req,res) => {
    try{
        let finalObject = {};
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // handling date
        let dateArray = req.body.timeApi.split('T')[0].split('-');
        let month = parseInt(dateArray[1]);
        month = monthNames[month-1];

        let date = month + " " + dateArray[2] + " " + dateArray[0];


        
        const query = Order.findOne({_id: req.body.orderID, clientID: req.body.clientID});
        const findOrder = await query;

        if (findOrder.status != "Complete" || findOrder.clientReviewSubmission == true){
            throw new Error('You cannot submit review at this point');
        }

        finalObject.clientID = findOrder.clientID;
        finalObject.clientName = findOrder.clientName;
        finalObject.clientImage = findOrder.clientImage;
        finalObject.review = req.body.review;
        finalObject.rating = req.body.rating;
        finalObject.date = date;

        const querySecond = Freelancer.updateOne({_id: findOrder.freelancerID},{$push: {reviews: finalObject, ratingArray: req.body.rating}}, {new: true, runValidators: true});
        const reviewSubmitted = await querySecond;

        const queryThird = Order.updateOne({_id: req.body.orderID}, {clientReviewSubmission: true}, {new: true, runValidators: true});
        const clientReviewStatus = await queryThird;


        const queryFourth = Freelancer.findOne({_id: findOrder.freelancerID}).select('ratingArray');
        const findFreelancer = await queryFourth;

        let sum = 0;
        let ratingArray = findFreelancer.ratingArray;
        let ratingNum;
        
        for (let i=0;i<ratingArray.length;i++){
            sum = sum + ratingArray[i];
        }
        
        ratingNum = (sum/ratingArray.length);
        ratingNum = Math.round((ratingNum + Number.EPSILON) * 10) / 10;

        let ratingString = ratingNum.toString();
        ratingString = ratingString + "/10";
        console.log('Rating is', ratingString, 'type is', typeof(ratingString));


        const queryFifth = Freelancer.updateOne({_id: findOrder.freelancerID}, {testimonial: ratingString}, {new: true, runValidators: true});
        const updateTestimonial = await queryFifth;



        res.status(200).json({status: '200', message: 'success'});

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}