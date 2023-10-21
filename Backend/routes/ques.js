const express = require('express');
const router = express.Router();
const Ques = require('../Schema/quesSchema');
const fetchuser = require("../middleware/fetchuser");
const isAdmin = require("../middleware/isAdmin");

router.post('/create',isAdmin,async(req, res) => {
    try {
        const newQuesion = await Ques.create({
            quesTitle: req.body.quesTitle,
            text: req.body.text,
            options: req.body.options,//array
            subject: req.body.subject,
            chapter: req.body.chapter,
        })
        res.json(newQuesion);
    
    } catch (error) {
        console.log(error,"Error");
        res.status(500).json({error:'cant create test'})
    }
    // .then(savedQuestion => {
    //     res.status(201).json(savedQuestion);
    // })
    // .catch(error => {
    //     res.status(500).json({ error: 'Error creating question' });
    // });

});
///////////////////////////////////////////////////////////////////////////////////////////////
//Get Ques 

//1)Subject Wise

// Get distinct chapters within a specific subject
router.get('/chapters/:subject', fetchuser, async (req, res) => {
    const subject = req.params.subject;

    try {
        const chapters = await Ques.distinct('chapter', { subject });
        res.json(chapters);
    } catch (error) {
        res.status(500).json({ error: 'Error finding distinct chapters by subject' });
    }
});



//2)MCQ Ques List
router.get('/:subject/:chapter',fetchuser,(req, res) => {
    const subject = req.params.subject;
    const chapter = req.params.chapter;

    Ques.find({ subject: subject, chapter: chapter })
        .then(data => {
            const mcqData = data.map(question => {
                return {
                    quesTitle: question.quesTitle,
                    text: question.text,
                    options: question.options,
                    correctAnswers: question.options.filter(option => option.isCorrect),
                };
            });

            res.json(mcqData);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error finding questions by subject and chapter' });
        });
});
////
router.get('/allQuestions', isAdmin,async (req, res) => {
    try {
        const allQuestions = await Ques.find();
        const questionCount = allQuestions.length;
        res.json({ count: questionCount, questions: allQuestions });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving questions and counting them' });
    }
});
//
router.get('/subject', fetchuser, async (req, res) => {
    try {
        const subjects = await Ques.distinct('subject');
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Error finding distinct subjects' });
    }
});
////////////////////////////////////////////////////////////////////////////
//Update Ques
router.put('/updateQues/:id',isAdmin,async(req,res)=>{
    const {quesTitle,text,options,subject,chapter} = req.body;
    const updatedQues ={};
    if(quesTitle){updatedQues.quesTitle=quesTitle}
    if(text){updatedQues.text=text}
    if(options){updatedQues.options=options}
    if(subject){updatedQues.subject=subject}
    if(chapter){updatedQues.chapter=chapter}
    let ques =await Ques.findById(req.params.id);
    if(!ques){
        res.status(404).send("Not Found")
    }
    ques = await Ques.findByIdAndUpdate(req.params.id,{$set:updatedQues},{new:true})
    res.json(updatedQues)
})
//
//Delete Ques
router.delete('/deleteQues/:id',isAdmin,async(req,res)=>{
    let deleteQues = await Ques.findByIdAndDelete(req.params.id)
    res.send(deleteQues)
       
})
//
module.exports = router;
