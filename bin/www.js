/**
 * Module dependencies.
 */

let app = require('../app')
let debug = require('debug')('personal-website-server:server')
let http = require('http')
const morgan = require('morgan')
let config = require('config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let options = {
    useMongoClient: true
};
mongoose.connect(config.DBHost, options)
    .then(() => {
        console.log('DATABASE CONNECTED AT : ' + config.DBHost)
    })
    .catch(ex => {
        console.log(config.DBHost)
        console.log("MongoDB is offline!")
        console.log(ex.message)
    })
mongoose.set('useFindAndModify', false)
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'))
}

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

let server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address()
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    debug('Listening on ' + bind)
}

module.exports = server