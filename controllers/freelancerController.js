const pbkdf2 = require('pbkdf2');
const jwt = require('jsonwebtoken');
const Freelancer = require('../models/freelancerModel');

exports.Signup = async (req,res) => {
    try{
        
        const query = Freelancer.create({
            fullName: req.body.fullName,
            password: req.body.password,
            telephoneNumber: req.body.telephoneNumber,
            emailAddress: req.body.emailAddress,
            nickName: req.body.nickName,
            rating: req.body.rating
        });

        const Signup = await query;
        res.status(201).json({status: '201', message: 'success', data: Signup});

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
        const Login = await query;

        if (Login == null){
            throw new Error('Failed to Login');
        }

        res.status(200).json({status: '200', message: 'success', data: Login});

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail', data: err});
    }
}