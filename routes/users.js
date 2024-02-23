const router = require('express').Router()
const userController = require('../controllers/users')

router.post     ('/', userController.create)
router.get      ('/', userController.getAll)
router.get      ('/:id', userController.load, userController.get)
router.patch    ('/:id', userController.load, userController.update)
router.delete   ('/:id', userController.load, userController.remove)

module.exports = router
