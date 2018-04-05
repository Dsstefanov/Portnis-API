let express = require('express')
let router = express.Router()
const loginHandler = require('./../../../handlers/loginHandler')

router.post('/users/auth/login', function(req, res, next) {
    loginHandler(req,res)
})

module.exports = router
