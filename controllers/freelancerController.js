const pbkdf2 = require('pbkdf2');
const jwt = require('jsonwebtoken');
const Freelancer = require('../models/freelancerModel');
const Card = require('../models/cardModel');
const Box = require('../models/boxModel');

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

        const queryThird = Box.create({
            freelancerID: signup._id
        })

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

        const queryBox = Box.updateOne({freelancerID: req.body.freelancerID}, {$push: {cards: req.body.card}});
        const box = await queryBox;

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

        if (req.body.card == "card9"){
            update = {$set :{'entSolutionPlaybook.card9.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card9.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card9.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card9.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card9.status': 'Used'}};
        }
        else if (req.body.card == "card10"){
            update = {$set :{'entSolutionPlaybook.card10.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card10.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card10.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card10.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card10.status': 'Used'}};
        }
        else if (req.body.card == "card11"){
            update = {$set :{'entSolutionPlaybook.card11.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card11.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card11.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card11.zonetext4': req.body.zonetext4, 'entSolutionPlaybook.card11.status': 'Used'}};
        }
        else if (req.body.card == "card12"){
            update = {$set :{'entSolutionPlaybook.card12.zonetext1': req.body.zonetext1, 'entSolutionPlaybook.card12.zonetext2': req.body.zonetext2, 'entSolutionPlaybook.card12.zonetext3': req.body.zonetext3, 'entSolutionPlaybook.card12.zonetext4': req.body.zonetext4, 'strategyAndVision.card12.status': 'Used'}};
        }
        
        const query = Card.updateOne({freelancerID:req.body.freelancerID}, update, {new:true, runValidators: true});
        const editCard = await query;

        const queryBox = Box.updateOne({freelancerID: req.body.freelancerID}, {$push: {cards: req.body.card}});
        const box = await queryBox;

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

        if (req.body.card == "card13"){
            update = {$set :{'leadershipAndSocialization.card13.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card13.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card13.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card13.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card13.status': 'Used'}};
        }
        else if (req.body.card == "card14"){
            update = {$set :{'leadershipAndSocialization.card14.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card14.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card14.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card14.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card14.status': 'Used'}};
        }
        else if (req.body.card == "card15"){
            update = {$set :{'leadershipAndSocialization.card15.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card15.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card15.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card15.zonetext4': req.body.zonetext4, 'leadershipAndSocialization.card15.status': 'Used'}};
        }
        else if (req.body.card == "card16"){
            update = {$set :{'leadershipAndSocialization.card16.zonetext1': req.body.zonetext1, 'leadershipAndSocialization.card16.zonetext2': req.body.zonetext2, 'leadershipAndSocialization.card16.zonetext3': req.body.zonetext3, 'leadershipAndSocialization.card16.zonetext4': req.body.zonetext4,
            'leadershipAndSocialization.card16.status': 'Used'}};
        }
        
        const query = Card.updateOne({freelancerID:req.body.freelancerID}, update, {new:true, runValidators: true});
        const editCard = await query;

        const queryBox = Box.updateOne({freelancerID: req.body.freelancerID}, {$push: {cards: req.body.card}});
        const box = await queryBox;

        
        res.status(200).json({status: '200', message: 'success', data: editCard});

    }
    catch(err){
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}

exports.ViewStrategyAndVision = async (req,res) => {
    try{
        const query = Card.findOne({freelancerID: req.body.freelancerID});
        const cards = await query;
        console.log(cards);
        res.status(200).json({status: '200', message: 'success', data: cards.strategyAndVision});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}

exports.ViewEntSolutionPlaybook = async (req,res) => {
    try{
        const query = Card.findOne({freelancerID: req.body.freelancerID});
        const cards = await query;
        console.log(cards);
        res.status(200).json({status: '200', message: 'success', data: cards.entSolutionPlaybook});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}

exports.ViewLeadershipAndSocialization  = async (req,res) => {
    try{
        const query = Card.findOne({freelancerID: req.body.freelancerID});
        const cards = await query;
        
        res.status(200).json({status: '200', message: 'success', data: cards.leadershipAndSocialization});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}

exports.ViewBox = async (req,res) => {
    try{
        
        const query = Card.findOne({freelancerID: req.body.freelancerID});
        const cardObject = await query;

        const querySecond = Box.findOne({freelancerID: req.body.freelancerID});
        const box = await querySecond;

        const boxArray = box.cards;

        if (boxArray.length <=0){
            res.status(200).json({status: '200', message: 'success', data: null});
            return;
        }
        
        const cardStrategy = cardObject.strategyAndVision;
        const cardEntSolution = cardObject.entSolutionPlaybook;
        const cardLeadership = cardObject.leadershipAndSocialization;

        let num;
        let cardS, cardE, cardL;
        let data = [];
        let obj = {};
        
        for (let i=0; i<boxArray.length; i++){
            obj = {};

            if (boxArray[i].length == 5){
                num = parseInt(boxArray[i].slice(-1));
            }
            else{
                num = parseInt(boxArray[i].slice(-2));
            }

            if (num >= 1 && num <= 8){
               cardS = cardStrategy[boxArray[i]];
               obj[boxArray[i]] = cardS;
               data.push(obj);
            }
            else if (num >= 9 && num <= 12){
                cardE = cardEntSolution[boxArray[i]];
                obj[boxArray[i]] = cardE;
                data.push(obj);
            }
            else{
                cardL = cardLeadership[boxArray[i]];
                obj[boxArray[i]] = cardL;
                data.push(obj)
                
            }
        }

        res.status(200).json({status: '200', message: 'success', data: data});

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}