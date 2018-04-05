'use strict'
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let userSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    personalText: {type: String, trim: true},
  pesho: {
    type: String, trim: true, index:  { unique: true, partialFilterExpression: { pesho: { $exists: true } } }
  },
    aboutText: {type: String, trim: true},
    projects: {type: [ObjectId], ref: 'Project'},
    skills: {type: [ObjectId], ref: 'Skill'},
    profileImage: {type: String},
    profession: {type: String, trim: true},
    socialMedias: {type: ObjectId, ref: 'SocialMedias'},
    contact: {type: ObjectId, ref: 'Contact'},
    valid: {type: Boolean}
}, { usePushEach: true })
module.exports = mongoose.model('User', userSchema)