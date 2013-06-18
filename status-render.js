"use strict"

var hyperglue = require('hyperglue');
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/public/status.html');

module.exports = function(data) {
  data.ip = data.ip || []
  var result = hyperglue(html, {
    '.hasinternet': {
      _html: data.hasInternet ? '&#10003;' : '&#10004;'
    },
    '.ip.value': {
      _text: data.ip.join(', '),
    },
    '.ip': {
      style: 'display: ' + (data.hasInternet ? '' : 'none')
    },
    '.serial': data.serial
  })
  return result
}
