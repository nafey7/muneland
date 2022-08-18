const Client = require ('../models/clientModel');
const Freelancer = require('../models/freelancerModel');

exports.Signup = async (req,res) => {
    try{
        const query = Client.create({
            fullName: req.body.fullName,
            nickName: req.body.nickName,
            password: req.body.password,
            telephoneNumber: req.body.telephoneNumber,
            emailAddress: req.body.emailAddress,

        });
        const clientSignup = await query;

        const querySecond = Freelancer.find().select('-createdAt -updatedAt -__v -password -quizScore -nickName -telephoneNumber -emailAddress');
        const listFreelancers = await querySecond;

        const finalData = {client: clientSignup, freelancersList: listFreelancers};
        res.status(201).json({status: '201', message: 'success', data: finalData});    
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

        const querySecond = Freelancer.find().select('-createdAt -updatedAt -__v -password -quizScore -nickName -telephoneNumber -emailAddress');
        const listFreelancers = await querySecond;

        const finalData = {client: findClient, freelancersList: listFreelancers};

        res.status(200).json({status: '200', message: 'success', data: finalData});

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}