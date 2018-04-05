const mongoose = require('mongoose')
const RegisteredUser = mongoose.model('RegisteredUser')

module.exports = (req, res) => {
    "use strict"
    RegisteredUser.findOne({email: req.params.email})
        .select('_id')
        .then(data => {
            res.json(data)
        })
}