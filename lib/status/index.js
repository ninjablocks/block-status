"use strict"

var shoe = require('shoe')
var MuxDemux = require('mux-demux')
var status = require('./status')

module.exports = function(app, route) {
  route = route || '/status'
  var sock = shoe(function(stream) {
    var mx = MuxDemux()
    stream.pipe(mx).pipe(stream)
    var statusStream = mx.createStream('status')
    statusStream.pipe(status.createStream()).pipe(statusStream)
  })

  sock.install(app, route)
}
