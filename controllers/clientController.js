const User = require ('../models/clientModel');
const Freelancer = require('../models/freelancerModel');

exports.Signup = async (req,res) => {
    try{
        const query = User.create({
            fullName: req.body.fullName,
            nickName: req.body.nickName,
            password: req.body.password,
            telephoneNumber: req.body.telephoneNumber,
            emailAddress: req.body.emailAddress,

        });
        const userSignup = await query;

        const querySecond = Freelancer.find().select('-createdAt -updatedAt -__v -password -quizScore -nickName -telephoneNumber -emailAddress');
        const listFreelancers = await querySecond;

        const finalData = {user: userSignup, freelancersList: listFreelancers};
        res.status(201).json({status: '201', message: 'success', data: finalData});    
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}