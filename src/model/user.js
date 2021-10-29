const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    token:{
        type: String
    }
},{timestamps:true,versionKey:false})

userSchema.methods.generateAuthToken = async function (){
    const user = this;  
    const token = jwt.sign({_id:user._id}, 'nothingnewhere');
    user.token=token
    return token
}


const User = new mongoose.model('User',userSchema)

module.exports = User