const Router = require('express')
const router = new Router()
const OneTwoController = require('./onetwo.controller')

router.post('/onetwo', OneTwoController.create)
router.get('/onetwo', OneTwoController.getAll)

module.exports = router
