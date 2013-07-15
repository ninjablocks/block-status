"use strict"

var toolbelt = require('ninja-toolbelt')
var diagnostic = toolbelt.diagnostic
var concat = require('concat-stream')

module.exports = function(req, res) {
  diagnostic([], {stdout: concat(function(data) {
    res.statusCode = 200
    var timestamp = new Date().toISOString()
    res.setHeader('Content-Disposition', 'attachment; filename="ninja-diagnostic-'+timestamp+'".md')
    res.setHeader("Content-Type", "text/markdown");
    res.end('# ninja-diagnostic \n## '+timestamp+' \n' + data)
  })}, function(err, data) {
    // ignore error, whatever.
  })
}
