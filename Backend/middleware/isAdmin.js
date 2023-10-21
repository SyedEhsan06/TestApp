var jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../Schema/userSchema')
const JWT_SECRET = process.env.JWT_SECRET
const isAdmin = async(req,res,next)=>{
    
   try {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send("Error Authorized")
    }
    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.user
    const role = await User.findById(req.user.id).select("-password");
    if (!role || role.role !== 'admin') {
        return res.status(403).send('Not an admin');
      }
  
      next();
   } catch (error) {
    console.log(error.message)
    res.status(500).json({error:'auth Error'})
   }
}

module.exports = isAdmin