### In action resemblejs test

##### In that browser
- `bower install`
- `npm install`
- `python -m SimpleHTTPServer 8080` <- on the root of the project
- visit `localhost:8080/index.html` <- to see some web quality images compared

##### Bulk File Comparison
- `brew update && brew install phantomjs`
- `bower install`
- `npm install`
- `python -m SimpleHTTPServer 8080` <- on the root of the project
- Populate baseline and screenshots folders from apangea
  - To generate images across the entire application you will need to set the default driver before all integration tests to the `Capybara.javascript_driver`
  - Do this for `rc`
  - and the branch you want to test
  - It takes hours to run the whole set in Vagrant so it is best to pick a specific group of integration tests to compare at a time for now
- `phantomjs compare.js`
