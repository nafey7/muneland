const Membership = require('../models/membershipModel');

exports.AddMembershipPlan = async (req,res) => {

    try{
        const query = Membership.create({
            name: req.body.name,
            type: req.body.type,
            cost: req.body.cost,
            icons: req.body.icons,
            numberOfQuestions: req.body.numberOfQuestions,
            features: req.body.features,
            deliverables: req.body.deliverables,
        });
    
        const addMembership = await query;
    
        res.status(201).json({status: 201, message: 'success', data: addMembership});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 404, message: 'fail', data: err.message});
    }
}

exports.StrategyAndVision = async (req,res) => {
    try{
        const query = Membership.findOne({name: 'Strategy & Vision'});
        const strategyAndVision = await query;

        res.status(200).json({status: 200, message: 'success', data: strategyAndVision});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 404, message: 'fail', data: err.message});
    }
}

exports.Solution = async (req,res) => {
    try{
        const query = Membership.findOne({name: 'Solution'});
        const solution = await query;

        res.status(200).json({status: 200, message: 'success', data: solution});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 404, message: 'fail', data: err.message});
    }
}

exports.Leadership = async (req,res) => {
    try{
        const query = Membership.findOne({name: 'Leadership'});
        const leadership = await query;

        res.status(200).json({status: 200, message: 'success', data: leadership});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 404, message: 'fail', data: err.message});
    }
}