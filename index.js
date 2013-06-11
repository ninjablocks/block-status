"use strict"

var Model = require('scuttlebutt/model')

var hasinternet = require('ninja-toolbelt/lib/internet')
var ipaddress = require('ninja-toolbelt/lib/ipaddress')
var serial = require('ninja-toolbelt/lib/serial')
var equals = require('equals')

var status = new Model()

function getStatus() {
  serial(function(err, value) {
    if (err) console.error('serial', err)
    if (equals(status.get('serial'), value)) return
    status.set('serial', value)
  })
  hasinternet(function(err, value) {
    if (err) console.error('hasinternet', err)
    if (equals(status.get('hasInternet'), value)) return
    status.set('hasInternet', value)
  })
  ipaddress(function(err, value) {
    if (err) console.error('ipaddress', err)
    if (equals(status.get('ip'), value)) return
    status.set('ip', value)
  })
}

setInterval(function() {
  getStatus()
}, 1000)

module.exports = status
