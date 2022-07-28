const router = require('express').Router()
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')

router.post('/register', userValidator.register, userCtrl.register)
router.post('/login', userValidator.login, userCtrl.login)
router.get('/', auth, userCtrl.getCurrentUser)
router.put('/', auth, userValidator.update, userCtrl.updateUser)

module.exports = router
