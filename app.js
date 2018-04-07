const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fs = require('fs')

require('./models/RegisteredUser')
require('./models/ProjectSchema')
require('./models/UserSchema')
require('./models/SkillSchema')
require('./models/SocialMediasSchema')
require('./models/ContactSchema')

let updateUser = require('./routes/users/id/user')
let project = require('./routes/users/projects')
let skill = require('./routes/users/skills')
let user = require('./routes/users')
let addProject = require('./routes/users/projects/addProject')
let addSkill = require('./routes/users/skills/addSkill')
let login = require('./routes/users/auth/login')
let register = require('./routes/users/auth/register')
let email = require('./routes/users/emails/unique')
let authorization = require('./routes/users/auth/authorize')
let usernameCheck = require('./routes/users/username/index')

let app = express()


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())//TODO MIGHT CAUSE ERROR IN ANGULARJS
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE')
    res.header["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

//static post routes
app.post('/users/auth/login', login)
app.post('/users/auth/register', register)
app.post('/users/delete', user)

//dynamic post routes
app.post('/users/id/:id/user', updateUser)
app.post('/users/:username/projects/add', addProject)
app.post('/users/:username/skills/add', addSkill)
app.get('/users/id/:id', user)
app.get('/users/emails/:email', email)
app.get('/users/username/:username', usernameCheck)
app.get('/users/auth/authorize/:userId/:remember_token', authorization)
app.get('/users/:username/projects', project)
app.get('/users/:username/skills', skill)
app.get('/users/:username', user)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
    // logging server errors
    if(err.status >= 500){
      console.log(err.message)
      fs.appendFile('errors.log', '\n\n\n' + err);
    }
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}


    // render the error page
    res.status(err.status || 500)
    res.json('error')
})

module.exports = app
