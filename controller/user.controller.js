const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

exports.SignUp = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!username || !email || !password) {
      return res.send('All fields required')
    }
    if (user) {
      return res.status(400).send('User already exists')
    }

    const hashedPassword = bcrypt.hash(password, saltRounds)
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })
    await newUser.save()
  } catch (error) {
    throw error
  }
}

exports.LogIn = async (req, res) => {
  const { usernameOrEmail, password } = req.body
  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail, email: usernameOrEmail }]
    })
    if (!user) return res.status(401).send("Invalid credentials")

    const isPasswordValid = await bcrypt.compare(password, user.password)    // Bcrypt
    if(!isPasswordValid) return res.status(401).send("Invalid credentials")

    // Token 
    const payload = {userid: user._id, username: user.username, email: user.email}
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "24h"})
    res.json({token})
  } catch (error) {
    throw error
  }
}