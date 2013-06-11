#!/usr/bin/env node

var http = require('http')
var ecstatic = require('ecstatic')(__dirname + '/../public')
var shoe = require('shoe')
var through = require('through')
var MuxDemux = require('mux-demux')

var status = require('../index')

var fs = require('fs')
var read = fs.createReadStream

var app = http.createServer(function(req, res) {
  if (req.url === '/') {
   read(__dirname + '/../public/index.html')
   .pipe(res)
  }
  else ecstatic(req, res)
})

app.listen(9096)

var sock = shoe(function(stream) {
  var mx = MuxDemux()
  stream.pipe(mx).pipe(stream)
  var statusStream = mx.createStream('status')
  statusStream.pipe(status.createStream()).pipe(statusStream)
})

sock.install(app, '/status')


