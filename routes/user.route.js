const express = require('express')
const router = express.Router()

const {
  SignUp,
  LogIn,
  GetUsers
} = require('../controller/user.controller')

router.post('/signup', SignUp)
router.post('/login', LogIn)
router.get('/getusers', GetUsers)

module.exports = router