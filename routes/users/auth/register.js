let express = require('express')
let router = express.Router()
const registerHandler = require('./../../../handlers/registerHandler')

router.post('/users/auth/register', function (req, res, next) {
    registerHandler(req, res)
})

module.exports = router
