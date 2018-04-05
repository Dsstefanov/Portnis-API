const mongoose = require('mongoose')
const User = mongoose.model('User')
const Skill = mongoose.model('Skill')
const SocialMedias = mongoose.model('SocialMedias')
const Contact = mongoose.model('Contact')

module.exports = (req, res) => {
    "use strict"
    User
        .findOne({username: req.params.username})
        .then(data => {
          console.log(data)
          if(data === null){
                res.json(false)
            }else{
                res.json(true)
            }
        })
}