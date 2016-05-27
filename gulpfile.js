var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload');
rimraf = require('rimraf'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify');

var basePath = './public'
var jsLibBundle = basePath + '/scripts/minlib.js';
var jsSiteBundle = basePath + '/scripts/minsite.js';
var cssLib = basePath + '/styles/lib/*.css'
var cssSite = basePath + '/styles/*.css'
var cssLibBundle = basePath + '/styles/lib/min-lib.css'
var cssSiteBundle = basePath + '/styles/min-site.css'

gulp.task('clean:minlibjs', function (cb) {
  rimraf(jsLibBundle, cb);
})

gulp.task('clean:minsitejs', function (cb) {
  rimraf(jsSiteBundle, cb);
})

gulp.task('clean:minlibcss', function (cb) {
  rimraf(cssLibBundle, cb);
});

gulp.task('clean:minsitecss', function (cb) {
  rimraf(cssSiteBundle, cb);
})

gulp.task('min:libjs', function () {
  gulp.src([
    'public/scripts/lib/jquery.min.js', 
    'public/scripts/lib/bootstrap.min.js',
    'public/scripts/lib/angular.js',
    'public/scripts/lib/angular-route.min.js',
    'public/scripts/lib/angular-annimate.min.js'
  ], { base: '.' })
    .pipe(concat('minlib.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('public/scripts/'));
});

gulp.task('min:sitejs', function () {
  gulp.src([
    'public/scripts/common/*.js',
    'public/scripts/modules/*.js',
    'public/scripts/controllers/*.js',
    'public/scripts/directives/*.js',
    'public/scripts/effects/*.js',
    'public/scripts/filters/*.js',
    'public/scripts/services/*.js'

  ], { base: '.' })
    .pipe(concat('minsite.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts/'));
});

gulp.task('min:libcss', function () {
  gulp.src([cssLib], { base: '.' })
    .pipe(concat('min-lib.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('public/styles/lib/'));
});

gulp.task('min:sitecss', function () {
  gulp.src([cssSite], { base: '.' })
    .pipe(concat('min-site.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('public/styles/'));
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'server',
    ext: 'js',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'clean:minlibjs',
  'clean:minsitejs',
  'clean:minlibcss',
  'clean:minsitecss',
  'min:libjs',
    'min:sitejs',
  'min:libcss',
  'min:sitecss',
  'develop'
]);
