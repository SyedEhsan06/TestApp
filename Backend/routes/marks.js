const express = require("express");
const router = express.Router();
const Marks = require("../Schema/marksSchema");
const fetchuser = require("../middleware/fetchuser");
const User = require("../Schema/userSchema");
const isAdmin = require("../middleware/isAdmin");
// POST route for crseating and storing user marks
router.post('/postmarks', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const userWithMarks = await User.findById(userId);
        const userMarks = new Marks({
            user: userId,
            name: userWithMarks.name,
            marks: req.body.marks,
            question: req.body.question,
            fullmarks: req.body.fullmarks,

        });

        await userMarks.save();

        res.json({ message: "Successfully Saved",userMarks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save marks" });
    }
});

////////////////////////
router.get('/results',fetchuser,async(req,res)=>{
    const marks  =await Marks.find({user:req.user.id})
    res.json(marks)
})
//////////////////
router.get('/results/:id',isAdmin,async(req,res)=>{
    const marks  =await Marks.find({user:req.params.id})
    res.json(marks)
})
//////////////////
router.get('/allresults',isAdmin,async(req,res)=>{
    try {
        const marks  =await Marks.find()
    res.json(marks)
    } catch (error) {
     console.log(error)   
    }
})
module.exports = router;
