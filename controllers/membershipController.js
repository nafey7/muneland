const Membership = require('../models/membershipModel');
const Client = require('../models/clientModel');
const stripe = require('stripe')('sk_test_51EpXsJKzyQ5VvESkZPscZDoi6zlsgRAu2G29xarnkAEhRLcpgNC1HuoVZh9CdCO2lJpo98Rx5l5GaC50bQpKksHs001U71yxPc');

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

exports.StrategyAndVision = async (req,res, next) => {
    try{
        req.body.name = 'Strategy & Vision';

        const query = Membership.findOne({name: 'Strategy & Vision'});
        const strategyAndVision = await query;

        const querySecond = Client.findById(req.body.clientID);
        const ClientInfo = await querySecond;

        if (strategyAndVision._id.toString() === ClientInfo.plan){
            res.status(200).json({status: 200, message: 'success', data: strategyAndVision});
        }
        else{
            next();
        }

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 404, message: 'fail', data: err.message});
    }
}

exports.Solution = async (req,res, next) => {
    try{
        req.body.name = 'Solution';

        const query = Membership.findOne({name: 'Solution'});
        const solution = await query;

        const querySecond = Client.findById(req.body.clientID);
        const ClientInfo = await querySecond;

        if (solution._id.toString() === ClientInfo.plan){
            res.status(200).json({status: 200, message: 'success', data: solution});
        }
        else{
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 404, message: 'fail', data: err.message});
    }
}

exports.Leadership = async (req,res, next) => {
    try{
        req.body.name = 'Leadership';
        const query = Membership.findOne({name: 'Leadership'});
        const leadership = await query;

        const querySecond = Client.findById(req.body.clientID);
        const ClientInfo = await querySecond;

        if (leadership._id.toString() === ClientInfo.plan){
            res.status(200).json({status: 200, message: 'success', data: leadership});
        }
        else{
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 404, message: 'fail', data: err.message});
    }
}

exports.CheckoutSession = async (req,res) => {
    try{
        const query = Membership.findOne({name: req.body.name});
        const MembershipDetails = await query;

        const querySecond = Client.findById(req.body.clientID);
        const ClientDetails = await querySecond;

        let membershipPlanPrice = ''
        if (MembershipDetails.type === 'PERSONAL'){
            membershipPlanPrice = 'price_1Mk8TjKzyQ5VvESkWhIKZ75Z';
        }
        else if (MembershipDetails.type === 'START UP'){
            membershipPlanPrice = 'price_1Mk8UOKzyQ5VvESk7WjsRK5Q';
        }
        else if (MembershipDetails.type === 'ENTERPRISE'){
            membershipPlanPrice = 'price_1Mk8V3KzyQ5VvESk1G8JKCPP';
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            success_url: 'https://munland-fe.vercel.app/strategy',
            cancel_url: 'https://munland-fe.vercel.app',
            customer_email: ClientDetails.emailAddress,
            line_items: [{
                price: membershipPlanPrice,
                quantity: 1
            }]
        })

        res.status(200).json({status: 200, message: 'success', membershipID: MembershipDetails._id, data: session});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 404, message: 'fail', data: err.message})
    }
}

exports.PurchaseMembershipPlan = async (req,res) => {
    try{
        // In this function, after successful transaction, the plan attribute of the User Model will contain the ID of the membership plan which they have bought.

        const filter = {_id: req.body.clientID};
        const update = {plan: req.body.membershipID};

        const query = Client.updateOne(filter, update, {new: true, runValidators: true});
        const MembershipBought = await query;

        res.status(200).json({status: 200, message: 'success', data: MembershipBought})
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 404, message: 'fail', data: err.message})
    }
}

exports.StripeWebhook =  async (req, res) => {
    const event = req.body;
  
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      // Payment successful, call the success function
      console.log('Payment successful');
      console.log(event.data.object.email);
    } else if (event.type === 'checkout.session.failed') {
      // Payment failed, call the failure function
      console.log('Payment failed');
      failureFunction();
    }
  
    res.sendStatus(200);
  };
  