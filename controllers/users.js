const router = require('express').Router()
const User = require('../models/User')
const { ObjectId } = require('mongodb')


const load = async (req, res, next) => {
  if ( !ObjectId.isValid(req.params.id) ) {
    return res.status(400).json({ message: `${req.params.id} is not a valid ObjectID` }) 
  } 

  let user
  try {
    user = await User.findById(req.params.id)
    console.log('getUser: ', user)
    if (!user) {
      return res.status(404).json({ message: `Cannot find user ${req.params.id}` })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

const create = async (req, res) => {
    const user = new User({
      name: req.body.name
    })
    try {
      const newUser = await user.save()
      res.status(201).json(newUser)
    } catch (err) {
      res.status(400).json({message: err.message})
    }
  }

const get = async (req, res) => {
  res.json(res.user)
}

const getAll = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

const update = async (req, res) => {
  if (req.body.name !== null) res.user.name = req.body.name

  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: `Deleted user ${req.params.id}` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  load,
  create,
  get,
  getAll,
  update,
  remove,
}
