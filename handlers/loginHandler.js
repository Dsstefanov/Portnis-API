const mongoose = require('mongoose')
const RegisteredUser = require('./../models/RegisteredUser')

module.exports = (req, res) => {
    "use strict"
    RegisteredUser.findOne({email: req.body.email})
        .select('+password')
        .then(user => {
            let json = {}
            if (user === null) {
                json.error = "User not found!"
                res.json(json)
            } else {
                user.comparePassword(req.body.password, function (err, isMatched) {
                    if (err) {
                        res.status(404)
                    }else {
                        if (isMatched === true) {
                            user.remember_token = uuidv4()
                            user.save()
                            json.success = {}
                            json.success._id = user._id
                            json.success.remember_token = user.remember_token
                        } else {
                            json.error = "Credentials do not match!";
                        }
                        res.json(json)
                    }
                })
            }
        })
        .catch(ex => {
            console.log(ex)
        })
}

/**
 * source: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}