var results = {};
var fs = require('fs');
var toBeProcessed = 0;
var processed = 0;

var onConsoleMessage = function(msg, lineNum, sourceId) {
  var result = JSON.parse(msg);
  results[result.file] = results[result.file] || [];
  results[result.file].push(result.data);
  fs.write('results.pnz', JSON.stringify(results,null,2), 'w');
  toBeProcessed--;
  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

var baseline = fs.list('baseline');
var filelist = new Array;
for(var o in baseline) {
  filelist.push(baseline[o]);
}

var compare = function(file){
  var page = require('webpage').create();
  page.file = file;
  page.viewportSize = { width: 1920, height: 1080 };
  page.onConsoleMessage = onConsoleMessage;
  page.open('http://localhost:8080/bigger.html', function(){
    page.evaluate(function(file) {
      window.file = file;
    }, page.file);
    window.setTimeout(function(){
      page.close();
      return;
    },3000);
  });
};

var processSome = function(count){
  toBeProcessed += count;
  for (var i = 0; i <= count; i++){
    var currentFile = filelist.pop();
    if(!currentFile){
      toBeProcessed--;
      continue;
    }
    if(!currentFile.match(/\.(jpg|jpeg|png|gif)$/)){
      toBeProcessed--;
      //console.log('Not image '+currentFile);
      continue;
    }
    if(!fs.exists('screenshots/'+currentFile)){
      toBeProcessed--;
      //console.log('Compared failed to find matching file for '+currentFile);
      continue;
    }
    console.log('testing '+currentFile);

    compare(currentFile);
  }
};

processSome(1);

var exitInterval = setInterval(function(){
  if(filelist.length <= 0){
    phantom.exit();
  }else{
    if(toBeProcessed == processed || toBeProcessed <= 0){
      toBeProcessed = 0;
      processed = 0;
      processSome(1);
    }
    //console.log(filelist.length, ' to be ', toBeProcessed, ' processed ', processed);
  }
}, 500);

//console.log('The default user agent is ' + page.settings.userAgent);
//page.settings.userAgent = 'SpecialAgent';
//page.content = '<html><body><p>Hello world</p></body></html>';

//var one = fs.readFileSync('/Users/paulscarrone/workrepos/resemble_batch/images/onyx.jpg');
//var two;

//page.one = one;

/*page.onLoadFinished = function (status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    page.injectJs('bower_components/jquery/dist/jquery.js');
    page.injectJs('node_modules/resemblejs/resemble.js');
    var respData;
    var callback = function(data){
      console.log(JSON.stringify(data,null,2));
    };
    var ua = page.evaluate(function(callback) {
      console.log('hi');
      var imgOne = new Image();
      imgOne.src = 'http://localhost:8080/images/onyx.jpg';
      imgOne.height = '500';
      imgOne.width = '500';
      var imgTwo = new Image();
      imgTwo.height = '500';
      imgTwo.width = '500';
      imgTwo.src = 'http://localhost:8080/images/roger.png';
      imgOne.id = "unhappy";
      imgTwo.id = "happy";
      $('body').append(imgOne);
      $('body').append(imgTwo);
      window.setTimeout(function(){
        console.log(JSON.stringify(resemble(page.one)), null,2);
      },2000);
    });
    //console.log(JSON.stringify(ua,null,2));
    window.setTimeout(function(){
      page.render('my_home.jpeg', {format: 'jpeg', quality: '100'});
      //console.log(page.content);
      phantom.exit();
    }, 3000);
  }

};*/