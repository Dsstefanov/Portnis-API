let express = require('express')
let router = express.Router()
const userHandler = require('./../../handlers/userHandler')
const userByIdHandler = require('./../../handlers/userByIdHandler')
const authorization = require('./../../handlers/authorizationHandler')
const deleteUserHandler = require('./../../handlers/deleteUserHandler')

/* GET home page. */
///router.get('/:username/projects', function(req, res, next) {
router.get('/users/id/:id', function (req, res, next) {
    userByIdHandler(req, res)
})
router.post('/users/delete', function (req, res, next) {
    authorization(req, res, 'UserController')
        .then(result => {
          if(result === false){
            res.status(404)
          }
          deleteUserHandler(req, res)
        })
})
router.get('/users/:username', function (req, res, next) {
  authorization(req, res, 'UserController')
      .then(result => {
        if(result === false){
          res.status(404)
        }
        userHandler(req, res)
      })
})
module.exports = router
