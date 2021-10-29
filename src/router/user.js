const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth');
const jwt=require('jsonwebtoken')
const axios = require('axios').default


router.post('/createUser',async(req,res) => {
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
    })

router.post('/login',auth,async(req,res) => {
    const user = req.body
    const email = user.email
    const foundUser = await User.findOne({email})
    res.send(foundUser)
})

router.get('/getData',async(req,res)=>{
    // await User.find({}).sort('-createdAt').then((data)=>{
    //     res.status(200).send({
    //         status:200,
    //         Message:data,
    //         Info:"Successfully"
    //     })
    const apiData = axios.get('https://api.github.com/users/mapbox').then((response) => {
        console.log(response.data)
        res.send(response.data)
    }).catch((e)=> {
        res.send(e)
    })
})


router.post('/logout',auth,async(req,res)=>{
    const user = req.user
    await User.findOneAndUpdate({id:user._id},{$unset:{token:user.token}}).then(()=>{
        res.status(201).send({
            status:200,
            Message:"logout sucessfully"
        })
    }).catch(err=>{
        res.status(400).send({
            status:400,
            Message:"Unable to logout"
        })
    })
})

module.exports = router