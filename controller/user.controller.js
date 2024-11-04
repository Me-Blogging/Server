const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

exports.SignUp = async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    return res.send('All fields required')
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).send('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })
    await newUser.save()
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: 'An internal server error occurred. Please try again later.' });
  }
}

exports.LogIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({email: email})
    if (!user) return res.status(401).send("Invalid credentials")

    // Bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return res.status(401).send("Invalid credentials")

    // Token 
    const payload = { userid: user._id, username: user.username, email: user.email }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "24h" }) 
    res.status(200).json({ token })
  } catch (error) {
    throw error
  }
}

exports.GetUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).send(users)
  } catch (error) {
    throw error
  }
}