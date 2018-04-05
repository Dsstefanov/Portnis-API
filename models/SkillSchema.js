'use strict'
const mongoose = require('mongoose')

let skillSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    percentage: {type: Number, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    titleColor: {type: {$regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/},required:true, trim: true},
    barColor: {type: {$regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/}, required:true, trim: true}
}, { usePushEach: true })
module.exports = mongoose.model('Skill', skillSchema)