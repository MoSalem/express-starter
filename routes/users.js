const router = require('express').Router()
const User = require('../models/User')

async function getUser({ params: { id } }, res, next) {

  let user
  try {
    user = await User.findById(id)
    console.log('getUser: ', user)
    if (!user) {
      return res.status(404).json({ message: `Cannot find user ${id}` })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
})

router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name !== null) res.user.name = req.body.name

  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: `Deleted user ${req.params.id}` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
