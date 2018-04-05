let express = require('express')
let router = express.Router()
const authorizationHandler = require('./../../../handlers/authorizationHandler')

router.get('/users/auth/authorize/:userId/:remember_token', function(req, res, next) {
    authorizationHandler(req,res)
})

module.exports = router
