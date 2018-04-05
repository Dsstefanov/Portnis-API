const mongoose = require('mongoose')
const User = mongoose.model('User')
const RegisteredUser = mongoose.model('RegisteredUser')
const Skill = mongoose.model('Skill')
const SocialMedias = mongoose.model('SocialMedias')
const Contact = mongoose.model('Contact')

module.exports = (req, res) => {
    "use strict"
    RegisteredUser
        .findOne({_id: req.params.id})
        .select('userId')
        .then(registeredUser => {
            User.findOne({_id: registeredUser.userId})
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
                .then(user => {
                    res.json(user)
                })
        })
}