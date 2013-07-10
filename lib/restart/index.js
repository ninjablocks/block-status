"use strict"

var log = require('debug')(process.env['DEBUG'])

var toolbelt = require('ninja-toolbelt')
var killClient = toolbelt.restart.killClient
var read = require('fs').createReadStream

module.exports = function(pid, req, res) {
  if (pid) killClient(pid, function(err) {
    log('block restart attempted')
    if (err) log(err) // continue anyway
    read(__dirname + '/restart.html').pipe(res)
  })
  else read(__dirname + '/restart.html').pipe(res)
}
