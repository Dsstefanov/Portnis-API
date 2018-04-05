'use strict'
const mongoose = require('mongoose')

let contactSchema = new mongoose.Schema({
    address: {type: String, required: true, trim: true},
    phone: {type: {$regex: /(?:45\s)?(?:\d{2}\s){3}\d{2}/}, required: true, trim: true},
    valid: {type: Boolean}
}, { usePushEach: true })
module.exports = mongoose.model('Contact', contactSchema)