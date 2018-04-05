let express = require('express')
let router = express.Router()
const addProjectHandler = require('./../../../handlers/addProjectHandler')

/* GET home page. */
///router.get('/:username/projects', function(req, res, next) {
router.post('/:username/projects/add', function(req, res, next) {
    addProjectHandler(req, res)
})

module.exports = router
