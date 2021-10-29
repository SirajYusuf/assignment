const mongoose = require('mongoose')
const db = mongoose.connect('mongodb+srv://siraj:sirajyusuf@cluster0.ft2xf.mongodb.net/jwt?retryWrites=true&w=majority')

db.then(() => {
    console.log("connection success")
}).catch((e)=> {
    console.log(e)
})

