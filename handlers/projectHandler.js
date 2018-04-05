const mongoose = require('mongoose')
const Project = mongoose.model('Project')
const User = mongoose.model('User')

module.exports = (req, res) => {
    "use strict"
    User.findOne({username: req.params.username})
        .select('projects')
        .populate({
            path: 'projects',
            model: 'Project'
        })
        .then(data => {
            res.json(data.projects)
    })
}