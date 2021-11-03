const User = require('../model/user')

const loginUser = async(req,res) => {
    const user = req.body
    const email = user.email
    const foundUser = await User.findOne({email})
    res.send(foundUser)
}

module.exports = loginUser