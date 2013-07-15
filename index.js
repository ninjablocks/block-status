"use strict"

var http = require('http')
var ecstatic = require('ecstatic')(__dirname + '/public')
var log = require('debug')(process.env['DEBUG'])
var status = require('./lib/status')
var restart = require('./lib/restart')
var diagnostics = require('./lib/diagnostics')

module.exports = function(program) {

  var app = http.createServer(function(req, res) {
    if (req.url === '/restart') restart(program.pid, req, res)
    else if (req.url === '/diagnostics') diagnostics(req, res)
    else ecstatic(req, res)
  })
  // middlewares
  status(app)

  app.listen(program.port || 0, function() {
    process.send && process.send(app.address())
    log('listening on %d', app.address().port)
  })
}
