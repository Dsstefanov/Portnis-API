process.env.NODE_ENV = 'test';

const mongoose = require("mongoose")
const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../bin/www')
const should = chai.should()
const RegisteredUser = mongoose.models.RegisteredUser
chai.use(chaiHttp)

describe('/users/auth/login', () => {
    "use strict"
    beforeEach(done => {
        RegisteredUser.create(getUser()).then(() => {
            done()
        })
    })
    afterEach(done => {
        RegisteredUser.remove({}).then(() => {
            done();
        })
    })
    it('should respond with "User not found"', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()));
        user.email = user.email + 'test'
        chai.request(server)
            .post('/users/auth/login')
            .send(user)
            .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('error').eql("User not found!")
                done()
            })
    })
    it('should respond with "Credentials do not match!"', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()))
        user.password = user.password + 'test'

        chai.request(server)
            .post('/users/auth/login')
            .send(user)
            .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('error').eql("Credentials do not match!")
                done()
            })
    })

    it('should return user object with _id and remember_token', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()))

        chai.request(server)
            .post('/users/auth/login')
            .send(user)
            .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('success')
                res.body.success.should.have.property('_id').be.a('string')
                res.body.success.should.have.property('remember_token').be.a('string')
                done()
            })
    })
})

const getUser = () => {
    return {
        email: 'test@gmail.com',
        password: 'qwe12Qwe12'
    }
}
