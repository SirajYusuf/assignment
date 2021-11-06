const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth');
const jwt=require('jsonwebtoken')
const axios = require('axios').default
const createUser = require('../controllers/createUser')
const loginUser = require('../controllers/loginUser')
const PDFDocument = require('pdfkit');
const fs = require('fs');

router.post('/createUser',createUser)

router.post('/login',auth,loginUser)

router.post('/pdf',async(req,res) => {
    const email =  req.body.email
    const password = req.body.password
const doc = new PDFDocument();
// Create a document
const createPdf = () => {
    doc.fontSize(25).text(`email :${email},password: ${password}`)
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.addPage().fontSize(25).text('Testing new page')
    doc.end();
}
    createPdf()
    res.send('success')
})

router.get('/getData',auth,async(req,res)=>{
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

router.patch('/update',auth,async(req,res)=> {
    req.user.email = undefined
    await req.user.save()
    res.send()
})
module.exports = router