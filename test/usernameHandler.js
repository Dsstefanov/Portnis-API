process.env.NODE_ENV = 'test';

const mongoose = require("mongoose")
const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../bin/www')
const should = chai.should()
const User = mongoose.models.User
chai.use(chaiHttp)
const url = '/users/username/:username'
let getUrl = (username) => `/users/username/${username}`

//TODO before running the tests add the authorization
describe('' + url, () => {
    "use strict"
    beforeEach(done => {
        User.remove({}).then(() => {
            done()
        })
    })
    afterEach(done => {
        User.remove({}).then(() => {
            done();
        })
    })
    it('should respond with false', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()));
        chai.request(server)
            .get(getUrl(getUser().username))
            .send(user)
            .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200);
                res.body.should.be.a('boolean');
                res.body.should.eql(false)
                done()
            })
    })
    it('should respond with false', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()));
        chai.request(server)
            .get(getUrl(getUser().username))
            .send(user)
            .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200);
                res.body.should.be.a('boolean');
                res.body.should.eql(false)
                done()
            })
    })

    it('should respond with true', (done) => {
        let user = JSON.parse(JSON.stringify(getUser()));
        User.create(user).then(() => {
            chai.request(server)
                .get(getUrl(getUser().username))
                .send(user)
                .end((err, res) => {
                    should.not.exist(err)
                    res.should.have.status(200);
                    res.body.should.be.a('boolean');
                    res.body.should.eql(true)
                    done()
                })
        })
    })
})

const getUser = () => {
    return {
        username: 'tests'
    }
}
