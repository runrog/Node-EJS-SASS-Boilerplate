## Node + EJS boilderplate

### This boilerplate includes the following
* Gulp (task runner)
* EJS (templating)
* BrowserSync (live reloading)
* SASS (css preprocessor)
* ES6 (gulp-babel)
* eslint (js linting)
* Mocha (testing)
* Karma (test runner)
* Chai (testing assertion lib)

### Install
```
npm install
```
```
npm start
```
### Gulp Tasks
Gulp tasks will run automatically but to manually run them:

Build dist/
```
gulp build-dist
```

Building Javascript: This will concat the js files together in order by name:
```
gulp build-js
```

Building SASS
```
gulp build-sass
```

### Testing
Create your ```*.spec.js``` files as needed inside ```src/js/*```
```
npm run test
```
