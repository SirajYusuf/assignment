const express =  require('express')
const userRouter = require('./router/user')
require('./db/mongodb')

port = 3000
const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(port,() => {
    console.log("server is up on port " + port)
})