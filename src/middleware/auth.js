const jwt = require('jsonwebtoken')
const User = require('../model/user')

const auth = async(req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'nothingnewhere')
        const user = await User.findOne({id:decoded._id, 'token': token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(400).send({
            error: 'Please authenticate'
        })
    }
}

module.exports = auth