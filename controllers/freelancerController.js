const pbkdf2 = require('pbkdf2');
const jwt = require('jsonwebtoken');

const Freelancer = require('../models/freelancerModel');
const Card = require('../models/cardModel');
const Quiz = require('../models/quizModel');
const Order = require('../models/orderModel');
const Client = require('../models/clientModel');

exports.Signup = async (req,res) => {
    try{
        // This part handles the quiz score and let proceed depending on the score of quiz.
        let answersArray = [];
        let total = 10;
        
        // sample correct answers generated in array form
        for(let i=0;i<total;i++){
            answersArray.push("Snow Crash");
        }
        
        let correct = 0;

        // comparing freelancer's answers with correct answers
        for (let j=0;j<total;j++){
            if (answersArray[j] == req.body.answers[j]){
                correct++;
            }
        }

        console.log(`quiz score is ${correct} out of 10`);

        // Account will be made only if freelancer scores above 50%
        if (correct <(total/2)){
            res.status(200).json({status: '200', message: 'You have scored below an average. Try again'});
            return;
        }
        
        const query = Freelancer.create({
            fullName: req.body.fullName,
            password: req.body.password,
            telephoneNumber: req.body.telephoneNumber,
            emailAddress: req.body.emailAddress,
            nickName: req.body.nickName,
            selfRating: req.body.selfRating,
            location: req.body.location,
            industryNetwork: req.body.industryNetwork,
            language: req.body.language,
            technology: req.body.technology,
            experience: req.body.experience,
            image: "default.jpg"
        });
        const signup = await query;

        const querySecond = Card.create({
            freelancerID: signup._id
        });
        const cardsCreation = await querySecond;


        res.status(201).json({status: '201', message: 'success', data: signup});

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail', data: err})
    }
}


exports.Login = async (req,res) => {
    try{
        if (!req.body.emailAddress || !req.body.password){
            throw new Error('Please enter an email or password');
        }
        const query = Freelancer.findOne({emailAddress: req.body.emailAddress, password: req.body.password});
        const login = await query;

        if (login == null){
            throw new Error('Failed to Login');
        }

        res.status(200).json({status: '200', message: 'success', data: login});

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}

exports.MinCost = async (req,res) => {
    try{
        let arr = req.body.dupArray;
        let costArr = [];
        let x;
        for (let i=0;i<arr.length;i++){
            x = parseInt(arr[i].cost);
            costArr.push(x);
        }
        let minCost = Math.min.apply(Math, costArr);

        const query = Freelancer.updateOne({_id: req.body.freelancerID}, {minCost: minCost}, {new:true, runValidators: true});
        const priceUpdated = await query;

        res.status(200).json({status: '200', message: 'success', data: priceUpdated});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}


exports.ViewBox = async (req,res) => {
    try{
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


        res.status(200).json({status: '200', message: 'success', data: finalCards});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.EditProfile = async (req,res) => {
    try{
        let query, updateProfile;

        let date = req.body.timeApi.split("T")[0];
        
        const queryTime = Freelancer.updateOne({_id: req.body.freelancerID}, {dateInfoUpdate: date}, {new: true, runValidators: true});
        const updateTime = await queryTime;

        if (req.body.schoolDegree){
            query = Freelancer.updateOne({_id: req.body.freelancerID}, {schoolDegree: req.body.schoolDegree}, {new: true, runValidators: true});
            updateProfile = await query;
        }
        if (req.body.enterprisesMissions){
            query = Freelancer.updateOne({_id: req.body.freelancerID}, {enterprisesMissions: req.body.enterprisesMissions}, {new: true, runValidators: true});
            updateProfile = await query;
        }
        if (req.body.certifications){
            query = Freelancer.updateOne({_id: req.body.freelancerID}, {certifications: req.body.certifications}, {new: true, runValidators: true});
            updateProfile = await query;
        }
        if (req.body.cv){
            query = Freelancer.updateOne({_id: req.body.freelancerID}, {cv: req.body.cv}, {new: true, runValidators: true});
            updateProfile = await query;
        }
        if (req.body.linkedin){
            query = Freelancer.updateOne({_id: req.body.freelancerID}, {linkedin: req.body.linkedin}, {new: true, runValidators: true});
            updateProfile = await query;
        }
        if (req.body.video){
            query = Freelancer.updateOne({_id: req.body.freelancerID}, {video: req.body.video}, {new: true, runValidators: true});
            updateProfile = await query;
        }
        if (req.body.biography){
            query = Freelancer.updateOne({_id: req.body.freelancerID}, {biography: req.body.biography}, {new: true, runValidators: true});
            updateProfile = await query;
        }


        
        res.status(200).json({status: '200', message: 'success'});
    }
    catch(err){
        console.log(err);
        res.staus(404).json({status: '404', message: 'fail'});
    }
}

exports.ViewOrders = async (req,res) => {
    try{
        const query = Order.find({freelancerID: req.body.freelancerID}).select('-freelancerName -freelancerImage -freelancerID -createdAt -updatedAt -__v');
        const viewOrders = await query;

        res.status(200).json({status: '200', message: 'success', data: viewOrders});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.AcceptOrder = async (req,res) => {
    try{
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        const query = Order.findOne({_id: req.body.orderID});
        const findOrder = await query

        let days = findOrder.orderDetails.days
        days = parseInt(days);

        let date = new Date();
        date.setDate(date.getDate() + days);
        date = date.toISOString().split('T')[0].split('-');

        let month = date[1];
        month = parseInt(month);
        
        let monthName = monthNames[month-1];
        let dateFinal = date[2];

        let dueDate = monthName+" "+dateFinal;
        console.log(dueDate);

        const querySecond = Order.updateOne({_id: req.body.orderID}, {dueDate: dueDate, status: "In Progress"}, {new: true, runValidators: true});
        const updateDate = await querySecond;

        res.status(200).json({status: '200', message: 'success'})

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.SubmitOrder = async (req,res) => {
    try{
        const query = Order.updateOne({_id: req.body.orderID}, {status: 'Ready'}, {new: true, runValidators: true});
        const submitOrder = await query;

        res.status(200).json({status: '200', message: 'success'});
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
        
        const query = Order.findOne({_id: req.body.orderID});
        const findOrder = await query;


        if (findOrder.status != "Complete" || findOrder.freelancerReviewSubmission == true){
            throw new Error('You cannot submit review at this point');
        }

        finalObject.freelancerID = findOrder.freelancerID;
        finalObject.freelancerName = findOrder.freelancerName;
        finalObject.freelancerImage = findOrder.freelancerImage;
        finalObject.review = req.body.review;
        finalObject.rating = req.body.rating;
        finalObject.date = date;

        const querySecond = Client.updateOne({_id: findOrder.clientID},{$push: {reviews: finalObject, ratingArray: req.body.rating}}, {new: true, runValidators: true});
        const reviewSubmitted = await querySecond;

        const queryThird = Order.updateOne({_id: req.body.orderID}, {freelancerReviewSubmission: true}, {new: true, runValidators: true});
        const freelancerReviewStatus = await queryThird;



        const queryFourth = Client.findOne({_id: findOrder.clientID}).select('ratingArray');
        const findClient = await queryFourth;

        let sum = 0;
        let ratingArray = findClient.ratingArray;
        let ratingNum;
        
        for (let i=0;i<ratingArray.length;i++){
            sum = sum + ratingArray[i];
        }
        
        ratingNum = (sum/ratingArray.length);
        ratingNum = Math.round((ratingNum + Number.EPSILON) * 10) / 10;

        let ratingString = ratingNum.toString();
        ratingString = ratingString + "/10";
        console.log('Rating is', ratingString, 'type is', typeof(ratingString));


        const queryFifth = Client.updateOne({_id: findOrder.clientID}, {testimonial: ratingString}, {new: true, runValidators: true});
        const updateTestimonial = await queryFifth;





        res.status(200).json({status: '200', message: 'success'});

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}


exports.ViewCards = async (req,res) => {
    try{
        const query = Card.findOne({freelancerID: req.body.freelancerID});
        const cards = await query;
        
        res.status(200).json({status: '200', message: 'success', data: cards});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}

exports.AddCardToBox = async (req,res, next) => {
    try{

        if (!req.body.zonetext1 || !req.body.zonetext2 || !req.body.zonetext3 || !req.body.zonetext4 || !req.body.rate || !req.body.days){
            throw new Error('Please fill all the fields');
        }

        let update;

        if (req.body.card == "card1"){
            update = {$set :{'strategyAndVision.card1.zonetext1': req.body.zonetext1, 'strategyAndVision.card1.zonetext2': req.body.zonetext2, 'strategyAndVision.card1.zonetext3': req.body.zonetext3, 'strategyAndVision.card1.zonetext4': req.body.zonetext4, 'strategyAndVision.card1.status': 'Used', 'strategyAndVision.card1.rate':req.body.rate, 'strategyAndVision.card1.days':req.body.days}};
        }
        else if (req.body.card == "card2"){
            update = {$set :{'strategyAndVision.card2.zonetext1': req.body.zonetext1, 'strategyAndVision.card2.zonetext2': req.body.zonetext2, 'strategyAndVision.card2.zonetext3': req.body.zonetext3, 'strategyAndVision.card2.zonetext4': req.body.zonetext4, 'strategyAndVision.card2.status': 'Used', 'strategyAndVision.card2.rate':req.body.rate, 'strategyAndVision.card2.days':req.body.days}};
        }
        else if (req.body.card == "card3"){
            update = {$set :{'strategyAndVision.card3.zonetext1': req.body.zonetext1, 'strategyAndVision.card3.zonetext2': req.body.zonetext2, 'strategyAndVision.card3.zonetext3': req.body.zonetext3, 'strategyAndVision.card3.zonetext4': req.body.zonetext4, 'strategyAndVision.card3.status': 'Used', 'strategyAndVision.card3.rate':req.body.rate, 'strategyAndVision.card3.days':req.body.days}};
        }
        else if (req.body.card == "card4"){
            update = {$set :{'strategyAndVision.card4.zonetext1': req.body.zonetext1, 'strategyAndVision.card4.zonetext2': req.body.zonetext2, 'strategyAndVision.card4.zonetext3': req.body.zonetext3, 'strategyAndVision.card4.zonetext4': req.body.zonetext4, 'strategyAndVision.card4.status': 'Used', 'strategyAndVision.card4.rate':req.body.rate, 'strategyAndVision.card4.days':req.body.days}};
        }
        else if (req.body.card == "card5"){
            update = {$set :{'strategyAndVision.card5.zonetext1': req.body.zonetext1, 'strategyAndVision.card5.zonetext2': req.body.zonetext2, 'strategyAndVision.card5.zonetext3': req.body.zonetext3, 'strategyAndVision.card5.zonetext4': req.body.zonetext4, 'strategyAndVision.card5.status': 'Used', 'strategyAndVision.card5.rate':req.body.rate, 'strategyAndVision.card5.days':req.body.days}};
        }
        else if (req.body.card == "card6"){
            update = {$set :{'strategyAndVision.card6.zonetext1': req.body.zonetext1, 'strategyAndVision.card6.zonetext2': req.body.zonetext2, 'strategyAndVision.card6.zonetext3': req.body.zonetext3, 'strategyAndVision.card6.zonetext4': req.body.zonetext4, 'strategyAndVision.card6.status': 'Used', 'strategyAndVision.card6.rate':req.body.rate, 'strategyAndVision.card6.days':req.body.days}};
        }
        else if (req.body.card == "card7"){
            update = {$set :{'strategyAndVision.card7.zonetext1': req.body.zonetext1, 'strategyAndVision.card7.zonetext2': req.body.zonetext2, 'strategyAndVision.card7.zonetext3': req.body.zonetext3, 'strategyAndVision.card7.zonetext4': req.body.zonetext4, 'strategyAndVision.card7.status': 'Used', 'strategyAndVision.card7.rate':req.body.rate, 'strategyAndVision.card7.days':req.body.days}};
        }
        else if (req.body.card == "card8"){
            update = {$set :{'strategyAndVision.card8.zonetext1': req.body.zonetext1, 'strategyAndVision.card8.zonetext2': req.body.zonetext2, 'strategyAndVision.card8.zonetext3': req.body.zonetext3, 'strategyAndVision.card8.zonetext4': req.body.zonetext4, 'strategyAndVision.card8.status': 'Used', 'strategyAndVision.card8.rate':req.body.rate, 'strategyAndVision.card8.days':req.body.days}};
        }

        else if (req.body.card == "card9"){
            update = {$set :{'entSolutionPlaybook.card9.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card9.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card9.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card9.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card9.status': 'Used', 'entSolutionPlaybook.card9.rate':req.body.rate, 'entSolutionPlaybook.card9.days':req.body.days}};
        }
        else if (req.body.card == "card10"){
            update = {$set :{'entSolutionPlaybook.card10.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card10.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card10.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card10.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card10.status': 'Used', 'entSolutionPlaybook.card10.rate':req.body.rate, 'entSolutionPlaybook.card10.days':req.body.days}};
        }
        else if (req.body.card == "card11"){
            update = {$set :{'entSolutionPlaybook.card11.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card11.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card11.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card11.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card11.status': 'Used', 'entSolutionPlaybook.card11.rate':req.body.rate, 'entSolutionPlaybook.card11.days':req.body.days}};
        }
        else if (req.body.card == "card12"){
            update = {$set :{'entSolutionPlaybook.card12.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card12.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card12.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card12.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card12.status': 'Used', 'entSolutionPlaybook.card12.rate':req.body.rate, 'entSolutionPlaybook.card12.days':req.body.days}};
        }
        else if (req.body.card == "card13"){
            update = {$set :{'leadershipAndSocialization.card13.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card13.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card13.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card13.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card13.status': 'Used', 'leadershipAndSocialization.card13.rate':req.body.rate, 'leadershipAndSocialization.card13.days':req.body.days}};
        }
        else if (req.body.card == "card14"){
            update = {$set :{'leadershipAndSocialization.card14.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card14.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card14.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card14.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card14.status': 'Used', 'leadershipAndSocialization.card14.rate':req.body.rate, 'leadershipAndSocialization.card14.days':req.body.days}};
        }
        else if (req.body.card == "card15"){
            update = {$set :{'leadershipAndSocialization.card15.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card15.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card15.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card15.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card15.status': 'Used', 'leadershipAndSocialization.card15.rate':req.body.rate, 'leadershipAndSocialization.card15.days':req.body.days}};
        }
        else if (req.body.card == "card16"){
            update = {$set :{'leadershipAndSocialization.card16.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card16.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card16.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card16.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card16.status': 'Used', 'leadershipAndSocialization.card16.rate':req.body.rate, 'leadershipAndSocialization.card16.days':req.body.days}};
        }

        const query = Card.updateOne({freelancerID:req.body.freelancerID}, update, {new:true, runValidators: true});
        const editCard = await query;

        const cardAndCost = {card: req.body.card, cost: req.body.rate}
        const queryCost = Freelancer.updateOne({_id: req.body.freelancerID}, {$push: {cost: cardAndCost}});
        const updatedCost = await queryCost;

        const queryFindCost = Freelancer.findOne({_id: req.body.freelancerID}).select('cost -_id');
        const findCost = await queryFindCost;

        let dupArray = [];
        let el;
        for (let k=0;k<findCost.cost.length;k++){
            el = findCost.cost[k];
            dupArray.push(el)
        }
        
        req.body.dupArray = dupArray;

        next()

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}

exports.DeleteCard = async (req,res, next) => {
    try{
        req.body.zonetext1 = "";
        req.body.zonetext2 = "";
        req.body.zonetext3 = "";
        req.body.zonetext4 = "";
        
        let update;

        if (req.body.card == "card1"){
            update = {$set :{'strategyAndVision.card1.zonetext1': req.body.zonetext1, 'strategyAndVision.card1.zonetext2': req.body.zonetext2, 'strategyAndVision.card1.zonetext3': req.body.zonetext3, 'strategyAndVision.card1.zonetext4': req.body.zonetext4, 'strategyAndVision.card1.status': 'Not used'}};
        }
        else if (req.body.card == "card2"){
            update = {$set :{'strategyAndVision.card2.zonetext1': req.body.zonetext1, 'strategyAndVision.card2.zonetext2': req.body.zonetext2, 'strategyAndVision.card2.zonetext3': req.body.zonetext3, 'strategyAndVision.card2.zonetext4': req.body.zonetext4, 'strategyAndVision.card2.status': 'Not used'}};
        }
        else if (req.body.card == "card3"){
            update = {$set :{'strategyAndVision.card3.zonetext1': req.body.zonetext1, 'strategyAndVision.card3.zonetext2': req.body.zonetext2, 'strategyAndVision.card3.zonetext3': req.body.zonetext3, 'strategyAndVision.card3.zonetext4': req.body.zonetext4, 'strategyAndVision.card3.status': 'Not used'}};
        }
        else if (req.body.card == "card4"){
            update = {$set :{'strategyAndVision.card4.zonetext1': req.body.zonetext1, 'strategyAndVision.card4.zonetext2': req.body.zonetext2, 'strategyAndVision.card4.zonetext3': req.body.zonetext3, 'strategyAndVision.card4.zonetext4': req.body.zonetext4, 'strategyAndVision.card4.status': 'Not used'}};
        }
        else if (req.body.card == "card5"){
            update = {$set :{'strategyAndVision.card5.zonetext1': req.body.zonetext1, 'strategyAndVision.card5.zonetext2': req.body.zonetext2, 'strategyAndVision.card5.zonetext3': req.body.zonetext3, 'strategyAndVision.card5.zonetext4': req.body.zonetext4, 'strategyAndVision.card5.status': 'Not used'}};
        }
        else if (req.body.card == "card6"){
            update = {$set :{'strategyAndVision.card6.zonetext1': req.body.zonetext1, 'strategyAndVision.card6.zonetext2': req.body.zonetext2, 'strategyAndVision.card6.zonetext3': req.body.zonetext3, 'strategyAndVision.card6.zonetext4': req.body.zonetext4, 'strategyAndVision.card6.status': 'Not used'}};
        }
        else if (req.body.card == "card7"){
            update = {$set :{'strategyAndVision.card7.zonetext1': req.body.zonetext1, 'strategyAndVision.card7.zonetext2': req.body.zonetext2, 'strategyAndVision.card7.zonetext3': req.body.zonetext3, 'strategyAndVision.card7.zonetext4': req.body.zonetext4, 'strategyAndVision.card7.status': 'Not used'}};
        }
        else if (req.body.card == "card8"){
            update = {$set :{'strategyAndVision.card8.zonetext1': req.body.zonetext1, 'strategyAndVision.card8.zonetext2': req.body.zonetext2, 'strategyAndVision.card8.zonetext3': req.body.zonetext3, 'strategyAndVision.card8.zonetext4': req.body.zonetext4, 'strategyAndVision.card8.status': 'Not used'}};
        }

        else if (req.body.card == "card9"){
            update = {$set :{'entSolutionPlaybook.card9.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card9.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card9.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card9.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card9.status': 'Not used'}};
        }
        else if (req.body.card == "card10"){
            update = {$set :{'entSolutionPlaybook.card10.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card10.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card10.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card10.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card10.status': 'Not used'}};
        }
        else if (req.body.card == "card11"){
            update = {$set :{'entSolutionPlaybook.card11.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card11.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card11.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card11.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card11.status': 'Not used'}};
        }
        else if (req.body.card == "card12"){
            update = {$set :{'entSolutionPlaybook.card12.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card12.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card12.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card12.zonetext4': req.body.zonetext4, 'strategyAndVision.card12.status': 'Not used'}};
        }
        else if (req.body.card == "card13"){
            update = {$set :{'leadershipAndSocialization.card13.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card13.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card13.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card13.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card13.status': 'Not used'}};
        }
        else if (req.body.card == "card14"){
            update = {$set :{'leadershipAndSocialization.card14.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card14.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card14.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card14.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card14.status': 'Not used'}};
        }
        else if (req.body.card == "card15"){
            update = {$set :{'leadershipAndSocialization.card15.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card15.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card15.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card15.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card15.status': 'Not used'}};
        }
        else if (req.body.card == "card16"){
            update = {$set :{'leadershipAndSocialization.card16.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card16.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card16.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card16.zonetext4': req.body.zonetext4,
            'leadershipAndSocialization.card16.status': 'Not used'}};
        }
       
        const filter = {freelancerID: req.body.freelancerID};

        const query = Card.updateOne(filter, update, {new:true, runValidators: true});
        const editCard = await query;


        const filterSecond = {freelancerID: req.body.freelancerID};

        const queryRemove = Freelancer.updateOne({_id: req.body.freelancerID}, {$pull : {cost:{card: req.body.card}}});
        const removeCost = await queryRemove;

        
        const queryFindCost = Freelancer.findOne({_id: req.body.freelancerID}).select('cost -_id');
        const findCost = await queryFindCost;

        let dupArray = [];
        let el;
        for (let k=0;k<findCost.cost.length;k++){
            el = findCost.cost[k];
            dupArray.push(el)
        }
        
        req.body.dupArray = dupArray;

        next();

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}