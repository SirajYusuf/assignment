const User = require('../model/user')


const createUser =  async(req,res) => {
    const user=new User(req.body)
    const email=req.body.email;
    const password=req.body.password;
    const token=await user.generateAuthToken();
    const insert={email,password,token}
    await User.create(insert).then((data)=>{
            res.status(201).send({
                status:201,
                Message:data,
                Info:"Successfully created"
            })
        }).catch((err)=>{
            console.log(err)
            res.status(400).send({
                status:400,
                Message:"Unable to create data"
            })
        })
    }

module.exports = createUser