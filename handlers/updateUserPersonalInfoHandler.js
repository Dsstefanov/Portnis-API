const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res) => {
    "use strict"

    User.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.json('Successfully updated')
        })
}