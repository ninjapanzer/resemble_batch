### In action resemblejs test

##### In that browser
- `bower install`
- `npm install`
- `python -m SimpleHTTPServer 8080` <- on the root of the project
- visit `localhost:8080/bigger.html` <- to see some images around 1 mb compared
- visit `localhost:8080/index.html` <- to see some web quality images compared

##### In phantomjs
- `brew update && brew install phantomjs`
- `bower install`
- `npm install`
- `python -m SimpleHTTPServer 8080` <- on the root of the project
- `phantomjs compare.js`