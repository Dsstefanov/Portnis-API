'use strict'
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let userSchema = new mongoose.Schema({
  name: {type: String, trim: true},
  personalText: {type: String, trim: true},
  username: {
    type: String, trim: true, index: {unique: true, partialFilterExpression: {username: {$exists: true}}}
  },
  aboutText: {type: String, trim: true},
  projects: {type: [ObjectId], ref: 'Project'},
  skills: {type: [ObjectId], ref: 'Skill'},
  profileImage: {type: String},
  profession: {type: String, trim: true},
  socialMedias: {type: ObjectId, ref: 'SocialMedias'},
  contact: {type: ObjectId, ref: 'Contact'},
  valid: {type: Boolean}
}, {usePushEach: true})

userSchema.pre('save', function (next) {
  let user = this
  this.valid = user.name && typeof user.name === 'string' &&
      user.personalText && typeof user.personalText === 'string' &&
      user.username && typeof user.username === 'string' &&
      user.aboutText && typeof user.aboutText === 'string' &&
      user.profession && typeof user.profession === 'string' &&
      user.profileImage && typeof user.profileImage === 'string' &&
      user.projects && user.projects.isArray() && user.projects.length > 0 &&
      user.skills && user.skills.isArray() && user.skills.length > 0 && user.contact

  next()
})

module.exports = mongoose.model('User', userSchema)