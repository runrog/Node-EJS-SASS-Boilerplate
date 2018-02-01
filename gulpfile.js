const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const autoClose = require('browser-sync-close-hook');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const ejs = require('gulp-ejs');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const fse = require('fs-extra');
const path = require('path');
const reload = browserSync.reload;

const copyFiles = function copyFiles(files, dest) {
  const copy = (file, dest) => {
    return fse.copy(file, dest, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Successfully copied file ${file}!`);
    });
  };
  for (var i = 0; i < files.length; i++) {
    copy(files[i], `${dest}${path.basename(files[i])}`);
  }
}

const jsNodeModulesTask = function buildIcons() {
  const dest = './dist/js/modules/';
  const modules = [
    'node_modules/jquery/dist/jquery.min.js',
  ];
  copyFiles(modules, dest);
};

const sassTask = function buildSass() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' })
    .on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest('./dist/css'))
    .on('end', () => {
      console.log('Successfully Built SASS');
      browserSync.reload();
    });
};

const jsTask = function buildJS() {
  return gulp.src([
    'src/js/**/*.js',
    '!src/js/**/*.spec.js',
  ])
  .pipe(concat('app.js'))
  .pipe(babel({
    presets: ['env'],
  }))
  .pipe(minify({
    ext: {
      min: '.min.js',
    },
  }))
  .pipe(gulp.dest('dist/js/'))
  .on('end', () => {
    console.log('Successfully Built JS');
  });
};

const imgTask = function buildImages() {
  return gulp.src('src/images/**/*')
   .pipe(imagemin([
     imagemin.optipng({ optimizationLevel: 5 }),
   ]))
   .pipe(gulp.dest('dist/images'))
   .on('end', () => {
     console.log('Successfully compressed images');
   });
};

const buildDist = function buildDist() {
  return gulp.src('src/index.ejs')
   .pipe(ejs({}, {}, { ext: '.html' }))
   .pipe(gulp.dest('./dist'))
   .on('end', () => {
     console.log('Successfully Built EJS!');
     // run all tasks
     sassTask();
     jsTask();
     imgTask();
     jsNodeModulesTask();
   });
}

gulp.task('build-sass', sassTask);
gulp.task('build-js', jsTask);
gulp.task('build-images', imgTask);
gulp.task('build-js-modules', jsNodeModulesTask);
gulp.task('build-dist', buildDist);

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.use({
    plugin() {},
    hooks: {
      'client:js': autoClose,
    },
  });
  browserSync({
    proxy: 'localhost:2001',
    port: 2004,
    notify: false,
    ui: false,
  });
});

gulp.task('nodemon', (cb) => {
  let called = false;
  return nodemon({
    script: 'server.js',
    ignore: [
      'gulpfile.js',
      'node_modules/',
    ],
  })
  .on('start', () => {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', () => {
    setTimeout(() => {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', [
  'browser-sync',
  'build-sass',
  'build-js',
  'build-images',
  'build-js-modules',
], () => {
  watch([
    '**/*.ejs',
  ], reload);
  gulp.watch([
    'src/styles/**/*.scss',
  ], ['build-sass']);
  gulp.watch([
    'src/images/**/*',
  ], ['build-images']);
  gulp.watch([
    'src/js/**/*.js',
  ], ['build-js']);
});
