let express = require('express')
let router = express.Router()
const usernameHandler = require('./../../../handlers/usernameHandler')
const authorize = require('./../../../handlers/authorizationHandler')

/* GET home page. */
///router.get('/:username/projects', function(req, res, next) {
router.get('/users/username/:username', function(req, res, next) {
    if(authorize(req, res)) {
        usernameHandler(req, res)
    }else{
        res.status(404)
    }
})
module.exports = router
