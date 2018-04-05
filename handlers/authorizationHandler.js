const mongoose = require('mongoose')
const RegisteredUser = mongoose.model('RegisteredUser')

module.exports = (req, res) => {
    "use strict"
    RegisteredUser.findOne({_id: req.params.userId})
        .select('remember_token')
        .then(data => {
            res.json(data.remember_token === req.params.remember_token)
        })
        .catch(ex => {
            if(!ex.reason){
                res.json(false)
            }
        })
}