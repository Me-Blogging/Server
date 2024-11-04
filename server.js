const express = require('express')
const cors = require('cors')
const connectDB = require('./Config/db')
require("dotenv").config()
const app = express()

const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(express.json({extended: false}))
app.use(cors())
 
connectDB()

app.use('/user', require('./routes/user.route'))
app.use('/post', require('./routes/post.routes'))
 
app.listen(PORT, console.log(`Running on port ${PORT}`))