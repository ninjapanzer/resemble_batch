var results = {};
var fs = require('fs');
var toBeProcessed = 0;
var processed = 0;
var total = 0;
var batch = 2;

var onConsoleMessage = function(msg, lineNum, sourceId) {
  var result = JSON.parse(msg);
  results[result.file] = results[result.file] || [];
  results[result.file].push(result.data);
  fs.write('results.pnz', JSON.stringify(results,null,2), 'w');
  toBeProcessed--;
  processed++;
  //console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

var baseline = fs.list('baseline');
var filelist = [];
for(var o in baseline) {
  filelist.push(baseline[o]);
}
total = filelist.length;

var compare = function(file){
  var page = require('webpage').create();
  page.file = file;
  page.viewportSize = { width: 1920, height: 1080 };
  page.onConsoleMessage = onConsoleMessage;
  page.open('http://localhost:8080/bigger.html', function(){
    page.evaluate(function(file) {
      window.file = file;
    }, page.file);
    // Wait for analysis to be done
    window.setInterval(function(){
      if(window.done){
        page.close();
        return;
      }
    }, 500);
  });
};

var processSome = function(count){
  toBeProcessed += count;
  for (var i = 0; i < count; i++){
    var currentFile = filelist.pop();
    if(!currentFile.match(/\.(jpg|jpeg|png|gif)$/)){
      toBeProcessed--;
      processed++;
      //console.log('Not image '+currentFile);
      continue;
    }
    if(!fs.exists('screenshots/'+currentFile)){
      toBeProcessed--;
      processed++;
      //console.log('Compared failed to find matching file for '+currentFile);
      continue;
    }
    console.log('testing '+currentFile);

    compare(currentFile);
  }
};

processSome(batch);

var exitInterval = setInterval(function(){
  if(filelist.length <= 0){
    phantom.exit();
  }else{
    if(toBeProcessed == 0){
      processSome(batch);
    }
    console.log(filelist.length, ' to be ', toBeProcessed, ' processed ', processed, ' of ', total);
  }
}, 500);
