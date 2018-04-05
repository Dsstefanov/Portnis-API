const mongoose = require('mongoose')
const User = mongoose.model('User')
const Skill = mongoose.model('Skill')
const SocialMedias = mongoose.model('SocialMedias')
const Contact = mongoose.model('Contact')

module.exports = (req, res) => {
    "use strict"
    User
        .findOne({username: req.params.username})
        .populate({
            path: 'projects',
            model: 'Project'
        })
        .populate({
            path: 'skills',
            model: 'Skill'
        })
        .populate({
            path: 'contact',
            model: 'Contact'
        })
        .populate({
            path: 'socialMedias',
            model: 'SocialMedias'
        })
        .then(data => {
        res.json(data)
    })
}