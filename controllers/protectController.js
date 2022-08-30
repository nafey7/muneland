const jwt = require('jsonwebtoken');
const Freelancer = require('../models/freelancerModel');
const Client = require('../models/clientModel');

exports.ProtectFreelancer = async (req,res, next) => {
    try{
        let token;

        if (!req.body.token){
            throw new Error ('Token is not present');
        }
        token = req.body.token

        const match = await jwt.verify (token, 'muneland-secret');
        const ID = match.id;
        
        const query = Freelancer.findById(ID);
        const freelancerFound = await query;

        
        if (!freelancerFound){
            throw new Error ('No such user exists');
        }

        req.body.freelancerID = ID;

        next();

    }
    catch(err){
        console.log(err);
        res.status(401).json({status: '401', message: 'fail', data: err.message});
    }
}

exports.ProtectClient = async (req,res, next) => {
    try{
        let token;

        if (!req.body.token){
            throw new Error ('Token is not present');
        }
        token = req.body.token

        const match = await jwt.verify (token, 'muneland-secret');
        const ID = match.id;
        
        const query = Client.findById(ID);
        const clientFound = await query;

        
        if (!clientFound){
            throw new Error ('No such user exists');
        }

        req.body.clientID = ID;

        next();


    }
    catch(err){
        console.log(err);
        res.status(401).json({status: '401', message: 'fail', data: err.message});
    }
}