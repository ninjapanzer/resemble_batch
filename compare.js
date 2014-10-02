var page = require('webpage').create();
var fs = require('fs');
//console.log('The default user agent is ' + page.settings.userAgent);
//page.settings.userAgent = 'SpecialAgent';
//page.content = '<html><body><p>Hello world</p></body></html>';
page.viewportSize = { width: 1920, height: 1080 };

var one = fs.readFileSync('/Users/paulscarrone/workrepos/resemble_batch/images/onyx.jpg');
var two;

page.one = one;

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

page.onLoadFinished = function (status) {
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

};

page.open('http://localhost', function(){

});