/*********************************
    Dependencies
 *********************************/

// Node dependencies
var gulp        = require('gulp');

// Gulp dependencies
var annotate    = require('gulp-ng-annotate');
var babel       = require('gulp-babel');
var concat      = require('gulp-concat');
var minify      = require('gulp-cssnano');
var notify      = require('gulp-notify');
var plumber     = require('gulp-plumber');
var prefix      = require('gulp-autoprefixer');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var templates   = require('gulp-angular-templatecache');
var uglify      = require('gulp-uglify');

// Define directories
var nodePath    = './node_modules/';
var publicPath  = './public/';
var resPath     = './assets/';

/*********************************
    Variables
 *********************************/

// Define error handler
var reportError = function (error) {
  notify({
    title:      'Gulp Task Error',
    message:    '<%= error.message %>',
  });
  console.log(error.toString());
  this.emit('end');
};

// Files and paths to be watched by Gulp
var watchPaths = {
  angular:    [
    resPath + 'scripts/angular/**/*.js',
    resPath + 'scripts/angular/**/**/*.html',
    resPath + 'scripts/angular/**/**/*.js',
    resPath + 'scripts/angular/**/**/*.component.js',
    resPath + 'scripts/angular/**/*.html',
  ],
  sass:       [
    resPath + 'styles/*.scss',
    resPath + 'styles/**/*.scss',
  ],
  scripts:    [
    resPath + 'scripts/*.js',
    resPath + 'scripts/*/**.js',
  ],
};

/*********************************
    Tasks
 *********************************/

// Task for Angular
gulp.task('angular', () => {
  'use strict';

  gulp.src([
    resPath + 'scripts/angular/app/*.js',
    resPath + 'scripts/angular/components/**/*.js',
    resPath + 'scripts/angular/components/**/*.component.js',
    resPath + 'scripts/angular/components/**/*.tpl.js',
    resPath + 'scripts/angular/routes/*.js',
    resPath + 'scripts/angular/services/*.js',
  ])
  .pipe(plumber({
    errorHandler: reportError,
  }))
  .pipe(sourcemaps.init())
  .pipe(concat('app.js'))
  .pipe(annotate())
  .pipe(uglify({
    mangle: {
      except: ['angular'],
    },
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(publicPath + 'scripts'));
});

// Task for Node-installed libraries
gulp.task('modules', () => {
  'use strict';

  gulp.src([
    nodePath + 'angular/angular.min.js',
    nodePath + 'angular-sanitize/angular-sanitize.min.js',
    nodePath + 'angular-ui-router/release/angular-ui-router.min.js',
    nodePath + 'jquery/dist/jquery.min.js',
    nodePath + 'tether/dist/js/tether.min.js',
    nodePath + 'bootstrap/dist/js/bootstrap.min.js',
    nodePath + 'moment/moment.js',
    nodePath + 'angular-moment/angular-moment.min.js',
  ])
    .pipe(plumber({
      errorHandler: reportError,
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('libraries.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(publicPath + 'scripts'));
});

// Task for Sass stylesheets
gulp.task('sass', () => {
  'use strict';

  gulp.src(resPath + 'styles/main.scss')
    .pipe(plumber({
      errorHandler: reportError,
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: [
            './assets/styles/',
            './node_modules/',
        ],
    }))
    .pipe(prefix())
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(publicPath + 'styles'));
});

// Task for JavaScript files
gulp.task('scripts', () => {
  'use strict';

  gulp.src(resPath + 'scripts/app.js')
    .pipe(plumber({
      errorHandler: reportError,
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(publicPath + 'scripts'));
});

// Task for Angular templates
gulp.task('templates', () => {
  'use strict';

  gulp.src([
    resPath + 'scripts/angular/components/**/*.html',
  ])
    .pipe(templates('templates.js', {
      standalone: true,
    }))
    .pipe(gulp.dest(publicPath + 'ng-templates'));
});

/*********************************
    Watchers
 *********************************/

// Watch task
gulp.task('watch', () => {
  // Use: .watch(watchPaths.array, ['task']);
  gulp.watch(watchPaths.angular, ['angular', 'templates']);
  gulp.watch(watchPaths.sass, ['sass']);
  gulp.watch(watchPaths.scripts, ['scripts']);
});

/*********************************
    Entry Point
 *********************************/

// Default task
gulp.task('default', ['angular', 'sass', 'scripts', 'templates', 'watch']);
