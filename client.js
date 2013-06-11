"use strict"

var shoe = require('shoe')
var MuxDemux = require('mux-demux')
var through = require('through')
var Model = require('scuttlebutt/model')
var render = require('./status-render')
var status = new Model()

status.on('update', function() {
  document.querySelector('#status').innerHTML = ''
  document.querySelector('#status').appendChild(render(status.toJSON()))
})

var admin = shoe('/status')
var mx = MuxDemux()
mx.on('connection', function(stream) {
  if (stream.meta === 'status') {
    stream.pipe(status.createStream()).pipe(stream)
  }
})

admin.pipe(mx).pipe(admin)

