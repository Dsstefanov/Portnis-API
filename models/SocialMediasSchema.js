'use strict'
const mongoose = require('mongoose')

let socialMediaSchema = new mongoose.Schema({
    facebook: {type: String, required: true, trim: true},
    linkedIn: {type: String, required: true, trim: true},
    github: {type: String, required: true, trim: true},
}, { usePushEach: true })
module.exports = mongoose.model('SocialMedias', socialMediaSchema)