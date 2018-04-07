const mongoose = require('mongoose')
const RegisteredUser = require('./../models/RegisteredUser')
const User = require('./../models/UserSchema')

module.exports = (req, res) => {
    "use strict"
    let reqUser = req.body
    RegisteredUser.create(reqUser)
        .then((dbRegUser) => {
            User.create({valid: false})
                .then(dbUser => {
                    dbRegUser.userId = dbUser._id
                  RegisteredUser.findOneAndUpdate({_id: dbRegUser._id}, dbRegUser)
                      .then(() => {
                        let json = {
                          success: "User successfully created!"
                        }
                        res.json(json)
                      })
                })
                .catch(err => {
                    console.log(err)
                    RegisteredUser.remove({_id: dbRegUser._id})
                })
        })
        .catch(ex => {
            let responseObj = req.body
            responseObj.errors = {
                error: ex
            }
            res.json(responseObj)
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