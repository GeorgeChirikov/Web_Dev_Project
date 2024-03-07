const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d' });
};

//get all users
const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: 'desc' }).select('email')

  res.status(200).json(users)
}


//Get a single user
const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'User not found' })
    return
  }

  const user = await user.findById(id)

  if (!user) {
    return res.status(400).json({ error: 'User not found' })
  }

  res.status(200).json(user)
}

//Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'User not found' })
  }

  const user = await User.findByIdAndDelete({ _id: id })

  if (!user) {
    return res.status(400).json({ error: 'User not found' })
  }

  res.status(200).json({ message: 'User removed' })
}

//Patch a user
const patchUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'User not found' })
  }

  const user = await User.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  )

  if (!user) {
    return res.status(400).json({ error: 'User not found' })
  }

  res.status(200).json({ message: ' User information updated' })
}

module.exports = {
  getUsers,  
  getUser,
  deleteUser,
  patchUser
}
