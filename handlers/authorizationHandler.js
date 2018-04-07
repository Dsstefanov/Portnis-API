const mongoose = require('mongoose')
const RegisteredUser = mongoose.model('RegisteredUser')

module.exports = (req, res, controller) => {
  "use strict"
  return RegisteredUser.findOne({_id: req.cookies.userId})
      .select('remember_token')
      .then(data => {
        if (controller) {
          return data.remember_token === req.cookies.auth
        }
        res.json(data.remember_token === req.cookies.auth)
      })
      .catch(ex => {
        if(controller){
          return false
        }
        if (!ex.reason) {
          res.json(false)
        }
      })
}