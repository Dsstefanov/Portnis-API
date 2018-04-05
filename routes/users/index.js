let express = require('express')
let router = express.Router()
const userHandler = require('./../../handlers/userHandler')
const userByIdHandler = require('./../../handlers/userByIdHandler')
const authorization = require('./../../handlers/authorizationHandler')

/* GET home page. */
///router.get('/:username/projects', function(req, res, next) {
router.get('/users/id/:id', function (req, res, next) {
    userByIdHandler(req, res)
})

router.get('/users/:username', function (req, res, next) {
    if (authorization(res, res)) {
        userHandler(req, res)
    }else{
        res.status(404)
    }
})
module.exports = router
