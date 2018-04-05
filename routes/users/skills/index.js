let express = require('express')
let router = express.Router()
const skillHandler = require('./../../../handlers/skillHandler')

/* GET home page. */
///router.get('/:username/projects', function(req, res, next) {
router.get('/users/:username/skills', function(req, res, next) {
    skillHandler(req,res)
})

module.exports = router
