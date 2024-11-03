const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.SignUp = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (!username || !email || !password) {
      return res.send('All fields required')
    }
    if (existingUser) {
      return res.status(400).send('User already exists')
    }

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

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) return res.status(401).send("Invalid credentials")
  } catch (error) {
    throw error
  }
}