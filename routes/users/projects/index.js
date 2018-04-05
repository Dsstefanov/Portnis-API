let express = require('express')
let router = express.Router()
const projectHandler = require('./../../../handlers/projectHandler')

/* GET home page. */
router.get('/users/:username/projects', function(req, res, next) {
    projectHandler(req,res)
})

module.exports = router
