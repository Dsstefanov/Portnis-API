let express = require('express')
let router = express.Router()
const updateUserPersonalInfoHandler = require('./../../../handlers/updateUserPersonalInfoHandler')

/* GET home page. */
///router.get('/:username/projects', function(req, res, next) {
router.post('/users/id/:id/user', function(req, res, next) {
    updateUserPersonalInfoHandler(req,res)
})
module.exports = router
