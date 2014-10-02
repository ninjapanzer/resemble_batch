path = require("path")
childProcess = require("child_process")
phantomjs = require("phantomjs")
binPath = phantomjs.path
childProcess.execFile binPath, '', (err, stdout, stderr) ->
  page = require("webpage").create()
  page.open "http://example.com", ->
    page.render "example.png"
    phantom.exit()
    #return



# handle results