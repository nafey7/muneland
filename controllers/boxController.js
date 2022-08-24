const Box = require('../models/boxModel');
const Card = require('../models/cardModel');

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
               if (boxArray[i] != ""){
                data.push(obj);
               }
               
            }
            else if (num >= 9 && num <= 12){
                cardE = cardEntSolution[boxArray[i]];
                obj[boxArray[i]] = cardE;
                if (boxArray[i] != ""){
                    data.push(obj);
                }
            }
            else{
                cardL = cardLeadership[boxArray[i]];
                obj[boxArray[i]] = cardL;
                if (boxArray[i] != ""){
                    data.push(obj);
                }
                
            }
        }

        res.status(200).json({status: '200', message: 'success', data: data});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'});
    }
}