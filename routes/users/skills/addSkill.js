let express = require('express')
let router = express.Router()
const addSkillHandler = require('./../../../handlers/addSkillHandler')

/* GET home page. */
///router.get('/:username/projects', function(req, res, next) {
router.post('/users/:username/skills/add', function(req, res, next) {
    addSkillHandler(req, res)
})

module.exports = router
