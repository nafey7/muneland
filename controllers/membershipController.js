const Membership = require('../models/membershipModel');
const Client = require('../models/clientModel');
const Freelancer = require('../models/freelancerModel');
const stripe = require('stripe')('sk_test_51EpXsJKzyQ5VvESkZPscZDoi6zlsgRAu2G29xarnkAEhRLcpgNC1HuoVZh9CdCO2lJpo98Rx5l5GaC50bQpKksHs001U71yxPc');
const helperController = require('../controllers/helperController');
const nodemailer = require("nodemailer");
const fs = require('fs');




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

        if (strategyAndVision.name === ClientInfo.plan){
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

        if (solution.name === ClientInfo.plan){
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

        if (leadership.name === ClientInfo.plan){
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

        let membershipID = MembershipDetails._id.toString();

        const querySecond = Client.findById(req.body.clientID);
        const ClientDetails = await querySecond;

        let membershipPlanPrice = '';
        let MembershipName = '';

        if (MembershipDetails.type === 'PERSONAL'){
            membershipPlanPrice = 'price_1Mk8TjKzyQ5VvESkWhIKZ75Z';
            MembershipName = 'strategyandvision'
        }
        else if (MembershipDetails.type === 'START UP'){
            membershipPlanPrice = 'price_1Mk8UOKzyQ5VvESk7WjsRK5Q';
            MembershipName = 'solution'
        }
        else if (MembershipDetails.type === 'ENTERPRISE'){
            membershipPlanPrice = 'price_1Mk8V3KzyQ5VvESk1G8JKCPP';
            MembershipName = 'leadership'
        }
        // `https://munland-fe.vercel.app/strategy?token=${req.body.token}`
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            success_url: `https://munland-fe.vercel.app/strategy/?token=${req.body.token}&membership=${MembershipName}`,
            cancel_url: `https://munland-fe.vercel.app/?token=${req.body.token}`,
            customer_email: ClientDetails.emailAddress,
            line_items: [{
                price: membershipPlanPrice,
                quantity: 1
            }],
            metadata: {
                "membershipID": membershipID,
                "clientID": req.body.clientID
            }
        })

        res.status(200).json({status: 200, message: 'success', membershipID: MembershipDetails._id, data: session});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 404, message: 'fail', data: err.message})
    }
}


exports.StripeWebhook =  async (req, res) => {
    const event = req.body;
  
    if (event.type === 'checkout.session.completed') {
        
        // Getting User Info
        const queryMembership = Membership.findOne({_id: event.data.object.metadata.membershipID});
        const MembershipName = await queryMembership; 

        const queryClient = Client.findOne({_id: event.data.object.metadata.clientID});
        const clientInfo = await queryClient;

        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            },
            tls: {
                ciphers:'SSLv3'
            }
          });
          transporter.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });
          let mailOptions = {
            from: process.env.EMAIL,
            to: clientInfo.emailAddress,
            subject: 'Thanks for joining Muneland',
            attachments: [
                {
                  filename: 'icon.png',
                  content: fs.createReadStream('/images/icon.png'),
                  cid: 'image'
                }
              ],
            html: `
            <div style="text-align:center;">
            <img src="cid: image" alt="your_image" />
            </div>
            <p>Hi ${clientInfo.firstName} &#x1F44B;. <br />We are so excited to have you on board with Muneland! &#x1F973; &#x1F973; &#x1F973;</p>
            <br />
            <h4>WHY?</h4>
            <p>The need for a sustainable and insightful asset that could guide the technological conversations became prevalent with a sudden spurt of interest in the metaverse. That's why we've created Muneland.</p>
            <br />
            <h4>Value</h4>
            <p>Muneland is a Platform to allow you to ask the essential questions and topics for establishing a strategy, and implementation of a solution around the Metaverse. The topics are laid out in the form of deliverables of activities to be followed by you (or by a team) and to help you achieve Leadership within your industry.</p>
            <p>Be the first one who gets access to our new information that we may send you anytime.</p>
            <p>Explore them!</p>
            <p>Enjoy your moments on Muneland and don't hesitate to contact us if you have any question!
            </p>
            <p>Muneland Team</p>`
          };
          
          await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                throw new Error ('Unexpected Error while sending Email')
            } else {
                console.log('Email sent: ' + info.response);
                
            }
          });

        const filter = {_id: event.data.object.metadata.clientID};
        // const update = {plan: event.data.object.metadata.membershipID};
        const update = { $push: { plan: MembershipName.name } }
        
        const query = Client.updateOne(filter, update, {new: true, runValidators: true});
        const MembershipBought = await query;
      
        console.log('Payment successful');

    } else if (event.type === 'checkout.session.failed') {
      // Payment failed, call the failure function
      console.log('Payment failed');
    }
  
    res.sendStatus(200);
  };
  
  exports.ReLogin = async (req,res) => {
    try{
        
        const query = Client.findOne({_id: req.body.clientID}).select('-createdAt -updatedAt -__v');
        const findClient = await query;

        // const token = jwt.sign({id: findClient._id}, 'muneland-secret');

        const querySecond = Freelancer.find().select('-selfRating -cost -createdAt -updatedAt -__v -password');
        const listFreelancers = await querySecond;

        const finalData = {client: findClient, freelancersList: listFreelancers};

        res.status(200).json({status: '200', message: 'success', data: finalData});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status:404, message: 'fail'})
    }
  }
