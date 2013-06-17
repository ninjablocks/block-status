"use strict"

var NAME = require('./package.json').name
var log = require('debug')(NAME)
var debug = require('debug')(NAME + ' debug')

var equals = require('equals')
var Model = require('scuttlebutt/model')

var hasinternet = require('ninja-toolbelt/lib/internet')
var ipaddress = require('ninja-toolbelt/lib/ipaddress')
var serial = require('ninja-toolbelt/lib/serial')

var status = new Model()

function getStatus() {
  serial(function(err, value) {
    if (err) log('serial', err)
    if (equals(status.get('serial'), value)) return
    debug('serial', value)
    status.set('serial', value)
  })
  hasinternet(function(err, value) {
    if (err && err.code !== 'ENOTFOUND') log('hasinternet', err)
    if (equals(status.get('hasInternet'), value)) return
    debug('hasInternet', value)
    status.set('hasInternet', value)
  })
  ipaddress(function(err, value) {
    if (err) log('ipaddress', err)
    if (equals(status.get('ip'), value)) return
    debug('ip', value)
    status.set('ip', value)
  })
}

setInterval(function() {
  getStatus()
}, 1000)

module.exports = status
