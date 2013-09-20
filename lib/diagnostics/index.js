"use strict"

var toolbelt = require('ninja-toolbelt')
var diagnostic = toolbelt.diagnostic
var concat = require('concat-stream')

module.exports = function(req, res) {

  var cst = concat()

  diagnostic([], {stdout: cst}, function(err) {
    // ignore error, whatever.
    console.warn('err', err)

    res.statusCode = 200
    var timestamp = new Date().toISOString()
    res.setHeader('Content-Disposition', 'attachment; filename="ninja-diagnostic-'+timestamp+'".md')
    res.setHeader("Content-Type", "text/markdown");
    res.end('# ninja-diagnostic \n## '+timestamp+' \n' + cst.getBody())
  })

}
