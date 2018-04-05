'use strict'
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 13

let userSchema = new mongoose.Schema({
    remember_token: {type: String},
    password: {type: String, required: true, trim: true, minlength: 6, maxlength: 100, select: false},
    email: {
        type: String, required: true, trim: true, unique: true,
        validate: {
            // `isAsync` is not strictly necessary in mongoose 4.x, but relying
            // on 2 argument validators being async is deprecated. Set the
            // `isAsync` option to `true` to make deprecation warnings go away.
            isAsync: true,
            validator: function (v, cb) {
                let phoneRegex = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                let msg = v + ' is not a valid email!';
                // First argument is a boolean, whether validator succeeded
                // 2nd argument is an optional error message override
                cb(phoneRegex.test(v), msg);
            },
            // Default error message, overridden by 2nd argument to `cb()` above
            message: 'Default error message'
        }
    },
    userId: {type: ObjectId, ref: 'User'}
}, {usePushEach: true})

userSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) return next()

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err)

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
})
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('RegisteredUser', userSchema)