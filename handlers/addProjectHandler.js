const mongoose = require('mongoose')
const User = mongoose.model('User')
const Project = mongoose.model('Project')

module.exports = (req, res) => {
    "use strict"
   User
           .findOne({username: req.params.username})
           .then(user => {
               Project.create(req.body)
                   .then(project => {
                       user.projects.push(project._id)
                       user.save()
                   })
                   .catch(err => {
                   console.log(err)
               })
           })
           .catch(err => {
               console.log(err)
           })
}