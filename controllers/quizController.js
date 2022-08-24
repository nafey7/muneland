const Quiz = require('../models/quizModel');

exports.AddQuestion = async (req,res) => {
    try{

        let query, addQuestion;

        for (let i=0; i<10;i++){
            query = Quiz.create({
                question: "Where did the term “Metaverse” originate from?",
                choices: ["Snow Crash", "Austin Power", "Mark Zukerberg", "Elon Musk"],
                answer: "Snow Crash"

            })
            addQuestion = await query;
        }
            

        res.status(201).json({status: '201', message: 'success'});

    }
    catch(err){
        console.log(err);
        res.status(404).json({status: '404', message: 'fail'})
    }
}

exports.ViewQuestions = async (req,res) => {
    try{
        const query =  Quiz.find().select('-answer -createdAt -updatedAt -__v -_id');
        const listQuestions = await query;

        res.status(200).json({status: '200', message: 'success', data: listQuestions});
    }
    catch(err){
        console.log(err);
        res.status(404).json({status: 'fail', message: 'fail'});
    }
}