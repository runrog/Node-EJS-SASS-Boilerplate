## Node + EJS boilderplate

For quick static sites.

### Install and Run
```
npm install
```
```
npm start
```

### Routing
Each new page you add needs to be a folder with an ```index.ejs``` file in it inside of the ```src/``` directory. Then you can access the page via the folder route. See below for example:

Folder structure:
```
.src/
...index.ejs
...about/
......index.ejs
...contact/
......index.ejs
```

If you wanted to navigate to the ```about``` page in the browser you would use ```http://localhost:2004/about/```

### Node Modules
If you want to include any node modules, you will need to add them to the "buildNodeModules" function in the gulp task file ```gulpfile.js```.

You need to specify the path in the ```node_modules``` folder to make. See below example:
```javascript
const modules = [
  {
    module: './node_modules/path/to/mymodule/file.min.js',
    dest: './dist/js/modules/',
  },
];
```
Gulp will make a copy into the local ```dist``` folder so it can be  served. It can then be referenced using the ```path``` variable in ejs like this:
```html
<script src="<%- path %>js/modules/file.min.js"></script>
```

### Distributing
When you're ready to distribute the goods, run the below command. This will compile/transpile/minimize everything and place all in the ```dist/``` folder.
```
gulp build-dist
```

### Gulp Tasks
Gulp tasks will run automatically but to manually run them:

Building Javascript: This will concat the js files together in order by name:
```
gulp build-js
```

Building SASS
```
gulp build-sass
```

Compressing Images
```
gulp build-images
```

Using JS Node Modules on the client
```
gulp build-js-modules
```

### Testing
Create your ```*.spec.js``` files as needed inside ```src/js/*```
```
npm run test
```

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
