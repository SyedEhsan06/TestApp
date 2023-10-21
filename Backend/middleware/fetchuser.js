var jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const fetchuser = (req,res,next)=>{
    
   try {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send("Error Authorized")
    }
    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.user
    next()
   } catch (error) {
    console.log(error)
    res.status(401).json({error:'auth Error'})
   }
}

module.exports = fetchuser