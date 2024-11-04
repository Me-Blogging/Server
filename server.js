const express = require('express')
const multer = require('multer')
const cors = require('cors')
const connectDB = require('./Config/db')
require("dotenv").config()
const app = express()

const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(express.json({extended: false}))
app.use(cors())

connectDB()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/') 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.use('/user', require('./routes/user.route'))
app.use('/post', upload.single('picture'), require('./routes/post.routes'))
 
app.listen(PORT, console.log(`Running on port ${PORT}`))