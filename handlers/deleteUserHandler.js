const mongoose = require('mongoose')
const RegisteredUser = require('./../models/RegisteredUser')
const User = require('./../models/UserSchema')

module.exports = (req, res) => {
  "use strict"
  RegisteredUser.findOne({_id: req.cookies.userId})
      .select('+password')
      .then((dbUser) => {
        dbUser.comparePassword(req.body.password, (err, isMatched) => {
          if (err) {
            res.status(404)
            return
          }
          if (isMatched===true) {
            RegisteredUser.remove({_id: dbUser._id})
                .then(() => {
              User.remove({_id: dbUser.userId})
                  .then(() => {
                    let json = {}
                    json.msg = 'Successfully deleted'
                    res.json(json)
                  })
                })
          } else {
            let json = {}
            json.errors = {}
            json.errors.error = {
              property: 'password',
              msg: 'Password is invalid!'
            }
            res.json(json)
          }
        })
      })

}