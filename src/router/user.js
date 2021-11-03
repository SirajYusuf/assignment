const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth');
const jwt=require('jsonwebtoken')
const axios = require('axios').default
const createUser = require('../controllers/createUser')
const loginUser = require('../controllers/loginUser')

router.post('/createUser',createUser)

router.post('/login',auth,loginUser)

router.get('/getData',async(req,res)=>{
    await User.find({}).sort('-createdAt').then((data)=>{
        res.status(200).send({
            status:200,
            Message:data,
            Info:"Successfully"
        })
    // const apiData = axios.get('https://api.github.com/users/mapbox').then((response) => {
    //     console.log(response.data)
    //     res.send(response.data)
    // }).catch((e)=> {
    //     res.send(e)
    // })
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