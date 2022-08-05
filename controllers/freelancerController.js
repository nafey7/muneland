const pbkdf2 = require('pbkdf2');
const jwt = require('jsonwebtoken');
const Freelancer = require('../models/freelancerModel');
const Card = require('../models/cardModel');

exports.Signup = async (req,res) => {
    try{
        
        const query = Freelancer.create({
            fullName: req.body.fullName,
            password: req.body.password,
            telephoneNumber: req.body.telephoneNumber,
            emailAddress: req.body.emailAddress,
            nickName: req.body.nickName,
            selfRating: req.body.selfRating,
            quizScore: req.body.quizScore
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

exports.EditCardStrategyAndVision = async (req,res) => {
    try{
        if (!req.body.zonetext1 || !req.body.zonetext2 || !req.body.zonetext3 || !req.body.zonetext4){
            throw new Error('Please fill all the fields');
        }

        let update;

        if (req.body.card == "card1"){
            update = {$set :{'strategyAndVision.card1.zonetext1': req.body.zonetext1, 'strategyAndVision.card1.zonetext2': req.body.zonetext2, 'strategyAndVision.card1.zonetext3': req.body.zonetext3, 'strategyAndVision.card1.zonetext4': req.body.zonetext4, 'strategyAndVision.card1.status': 'Used'}};
        }
        else if (req.body.card == "card2"){
            update = {$set :{'strategyAndVision.card2.zonetext1': req.body.zonetext1, 'strategyAndVision.card2.zonetext2': req.body.zonetext2, 'strategyAndVision.card2.zonetext3': req.body.zonetext3, 'strategyAndVision.card2.zonetext4': req.body.zonetext4, 'strategyAndVision.card2.status': 'Used'}};
        }
        else if (req.body.card == "card3"){
            update = {$set :{'strategyAndVision.card3.zonetext1': req.body.zonetext1, 'strategyAndVision.card3.zonetext2': req.body.zonetext2, 'strategyAndVision.card3.zonetext3': req.body.zonetext3, 'strategyAndVision.card3.zonetext4': req.body.zonetext4, 'strategyAndVision.card3.status': 'Used'}};
        }
        else if (req.body.card == "card4"){
            update = {$set :{'strategyAndVision.card4.zonetext1': req.body.zonetext1, 'strategyAndVision.card4.zonetext2': req.body.zonetext2, 'strategyAndVision.card4.zonetext3': req.body.zonetext3, 'strategyAndVision.card4.zonetext4': req.body.zonetext4, 'strategyAndVision.card4.status': 'Used'}};
        }
        else if (req.body.card == "card5"){
            update = {$set :{'strategyAndVision.card5.zonetext1': req.body.zonetext1, 'strategyAndVision.card5.zonetext2': req.body.zonetext2, 'strategyAndVision.card5.zonetext3': req.body.zonetext3, 'strategyAndVision.card5.zonetext4': req.body.zonetext4, 'strategyAndVision.card5.status': 'Used'}};
        }
        else if (req.body.card == "card6"){
            update = {$set :{'strategyAndVision.card6.zonetext1': req.body.zonetext1, 'strategyAndVision.card6.zonetext2': req.body.zonetext2, 'strategyAndVision.card6.zonetext3': req.body.zonetext3, 'strategyAndVision.card6.zonetext4': req.body.zonetext4, 'strategyAndVision.card6.status': 'Used'}};
        }
        else if (req.body.card == "card7"){
            update = {$set :{'strategyAndVision.card7.zonetext1': req.body.zonetext1, 'strategyAndVision.card7.zonetext2': req.body.zonetext2, 'strategyAndVision.card7.zonetext3': req.body.zonetext3, 'strategyAndVision.card7.zonetext4': req.body.zonetext4, 'strategyAndVision.card7.status': 'Used'}};
        }
        else if (req.body.card == "card8"){
            update = {$set :{'strategyAndVision.card8.zonetext1': req.body.zonetext1, 'strategyAndVision.card8.zonetext2': req.body.zonetext2, 'strategyAndVision.card8.zonetext3': req.body.zonetext3, 'strategyAndVision.card8.zonetext4': req.body.zonetext4, 'strategyAndVision.card8.status': 'Used'}};
        }
        
        const query = Card.updateOne({freelancerID:req.body.freelancerID}, update, {new:true, runValidators: true});
        const editCard = await query;

        res.status(200).json({status: '200', message: 'success', data: editCard});

    }
    catch(err){
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}

exports.EditCardEntSolutionPlaybook = async (req,res) => {
    try{
        if (!req.body.zonetext1 || !req.body.zonetext2 || !req.body.zonetext3 || !req.body.zonetext4){
            throw new Error('Please fill all the fields');
        }

        let update;

        if (req.body.card == "card1"){
            update = {$set :{'entSolutionPlaybook.card1.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card1.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card1.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card1.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card1.status': 'Used'}};
        }
        else if (req.body.card == "card2"){
            update = {$set :{'entSolutionPlaybook.card2.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card2.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card2.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card2.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card2.status': 'Used'}};
        }
        else if (req.body.card == "card3"){
            update = {$set :{'entSolutionPlaybook.card3.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card3.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card3.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card3.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card3.status': 'Used'}};
        }
        else if (req.body.card == "card4"){
            update = {$set :{'entSolutionPlaybook.card4.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card4.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card4.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card4.zonetext4': req.body.zonetext4, 'strategyAndVision.card4.status': 'Used'}};
        }
        
        const query = Card.updateOne({freelancerID:req.body.freelancerID}, update, {new:true, runValidators: true});
        const editCard = await query;

        res.status(200).json({status: '200', message: 'success', data: editCard});

    }
    catch(err){
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}

exports.EditCardLeadershipAndSocialization = async (req,res) => {
    try{
        if (!req.body.zonetext1 || !req.body.zonetext2 || !req.body.zonetext3 || !req.body.zonetext4){
            throw new Error('Please fill all the fields');
        }

        let update;

        if (req.body.card == "card1"){
            update = {$set :{'leadershipAndSocialization.card1.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card1.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card1.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card1.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card1.status': 'Used'}};
        }
        else if (req.body.card == "card2"){
            update = {$set :{'leadershipAndSocialization.card2.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card2.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card2.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card2.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card2.status': 'Used'}};
        }
        else if (req.body.card == "card3"){
            update = {$set :{'leadershipAndSocialization.card3.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card3.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card3.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card3.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card3.status': 'Used'}};
        }
        else if (req.body.card == "card4"){
            update = {$set :{'leadershipAndSocialization.card4.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card4.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card4.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card4.zonetext4': req.body.zonetext4, 'strategyAndVision.card4.status': 'Used'}};
        }
        
        const query = Card.updateOne({freelancerID:req.body.freelancerID}, update, {new:true, runValidators: true});
        const editCard = await query;

        res.status(200).json({status: '200', message: 'success', data: editCard});

    }
    catch(err){
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}