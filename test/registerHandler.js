process.env.NODE_ENV = 'test';

const mongoose = require("mongoose")
const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../bin/www')
const should = chai.should()
const RegisteredUser = mongoose.models.RegisteredUser
chai.use(chaiHttp)
const url = '/users/auth/register'

const getUser = () => {
    return {
        email: 'test@gmail.com',
        password: 'qwe12Qwe12'
    }
}
describe('' + url, () => {
    "use strict"
    before(done => {
        const UserSchema = require('./../models/UserSchema')
        UserSchema.remove({})
            .then(() => {
                done()
            })
    })
    beforeEach(done => {
        RegisteredUser.remove({}).then(() => {
            done();
        })
    })
    afterEach(done => {
        RegisteredUser.remove({}).then(() => {
            done();
        })
    })
    after(done => {
        const UserSchema = require('./../models/UserSchema')
        UserSchema.remove({})
            .then(() => {
                done()
            })
    })
    it('should throw error for unique email, errors.error.code: 11000', (done) => {
        RegisteredUser.create(getUser())
            .then(() => {
                chai.request(server)
                    .post(url)
                    .send(getUser())
                    .end((err, res) => {
                        should.not.exist(err)
                        res.should.have.status(200)
                        res.body.should.have
                            .property('errors')
                            .property('error')
                            .property('code')
                            .eql(11000)
                        done()
                    })
            })
    })
    it('should throw error for password length being below minimum', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()))
        user.password = ''
        let passwordLength = 5
        for (let i = 0; i < passwordLength; i++) {
            user.password += 'a'
        }

        chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200)
                res.body.should.have
                    .property('errors')
                    .property('error')
                    .property('errors')
                    .property('password')
                    .property('properties')
                    .property('type')
                    .eql('minlength')
                done()
            })
    })

    it('should throw error for password length being above maximum', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()))
        user.password = ''
        let passwordLength = 101
        for (let i = 0; i < passwordLength; i++) {
            user.password += 'a'
        }

        chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200)
                res.body.should.have
                    .property('errors')
                    .property('error')
                    .property('errors')
                    .property('password')
                    .property('properties')
                    .property('type')
                    .eql('maxlength')
                done()
            })
    })

    it('should pass with password equal to minimum password length', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()))
        user.password = ''
        let passwordLength = 6
        for (let i = 0; i < passwordLength; i++) {
            user.password += 'a'
        }

        chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200)
                res.body.should.have
                    .property('success')
                    .eql('User successfully created!')
                done()
            })
    })

    it('should pass with password equal to maximum password length', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()))
        user.password = ''
        let passwordLength = 100
        for (let i = 0; i < passwordLength; i++) {
            user.password += 'a'
        }

        chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200)
                res.body.should.have.property('success').eql('User successfully created!')
                done()
            })
    })

    it('should throw error for invalid email', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()))
        user.email = 'asd'
        chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200)
                res.body.should.have
                    .property('errors')
                    .property('error')
                    .property('errors')
                    .property('email')
                    .property('properties')
                    .property('path')
                    .eql('email')
                res.body.errors.error.errors
                    .email.properties.should.have.property('message').eql(`${user.email} is not a valid email!`)
                done()
            })
    })
})

