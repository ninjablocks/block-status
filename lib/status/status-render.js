"use strict"

var hyperglue = require('hyperglue');
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/template.html');

module.exports = function(data) {
  data.ip = data.ip || []
  var result = hyperglue(html, {
    '.hasinternet': {
      _html: data.hasInternet ? '&#10004;' : '&#10008;'
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
