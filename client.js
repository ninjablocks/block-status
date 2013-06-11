"use strict"

var shoe = require('shoe')
var MuxDemux = require('mux-demux')
var Model = require('scuttlebutt/model')
var render = require('./status-render')

module.exports = function(options) {
  options = options || {}
  var route = options.route || '/status'

  var status = new Model()
  status.el = options.el || document.createElement('div')

  status.on('update', function() {
    status.el.innerHTML = ''
    status.el.appendChild(render(status.toJSON()))
  })

  var socket = shoe(route)
  var mx = MuxDemux()
  mx.on('connection', function(stream) {
    if (stream.meta === 'status') {
      stream.pipe(status.createStream()).pipe(stream)
    }
  })

  socket.pipe(mx).pipe(socket)
  return status
}


