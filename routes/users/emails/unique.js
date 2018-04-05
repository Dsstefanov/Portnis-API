let express = require('express')
let router = express.Router()
const emailHandler = require('./../../../handlers/emailHandler')

/* GET home page. */
///router.get('/:username/projects', function(req, res, next) {
router.get('/users/emails/:email', function(req, res, next) {
    emailHandler(req,res)
})

module.exports = router
