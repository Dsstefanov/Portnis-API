const mongoose = require('mongoose')
const Skill = mongoose.model('Skill')
const User = mongoose.model('User')

module.exports = (req, res) => {
    "use strict"
    User.findOne({username: req.params.username})
        .populate({
            path: 'skills',
            model: 'Skill'
        })
        .select('skills')
        .then(data => {
            res.json(data)
        })
}