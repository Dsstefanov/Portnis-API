'use strict'
const mongoose = require('mongoose')

let projectSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    technologies: {type: [String], required: true},
    image: {type: String},
    weblink: {type: String, trim: true},
    githubLink: {type: String, required: true, trim: true},
    buildingReason: {type: String, required: true, trim: true}
}, {usePushEach: true})
module.exports = mongoose.model('Project', projectSchema)