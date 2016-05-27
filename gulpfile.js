var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload');
rimraf = require('rimraf'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify');

var basePath = './public'

var cssLib = basePath + '/styles/lib/*.css'
var cssSite = basePath + '/styles/*.css'
var cssLibBundle = basePath + '/styles/lib/min-lib.css'
var cssSiteBundle = basePath + '/styles/min-site.css'

gulp.task('clean:minjs', function (cb) {
  rimraf('./public/scripts/minJS.js', cb);
})

gulp.task('clean:mincss', function (cb) {
  rimraf('./public/styles/minCSS.css', cb);
});

gulp.task('min:js', ['clean:minjs'],function () {
  gulp.src([
    'public/scripts/lib/jquery.min.js',
    'public/scripts/lib/bootstrap.min.js',
    'public/scripts/lib/angular.min.js',
    'public/scripts/lib/angular-route.min.js',
    'public/scripts/lib/angular-animate.min.js',
    'public/scripts/common/*.js',
    'public/scripts/modules/*.js',
    'public/scripts/controllers/*.js',
    'public/scripts/directives/*.js',
    'public/scripts/effects/*.js',
    'public/scripts/filters/*.js',
    'public/scripts/services/*.js'
  ], { base: '.' })
    .pipe(concat('minJS.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts/'));
});

gulp.task('min:css', ['clean:mincss'], function () {
  gulp.src(['./public/styles/*.css'], { base: '.' })
    .pipe(concat('minCSS.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./public/styles/'));
});

gulp.task('clean',[
  'clean:minjs',
  'clean:mincss'
]);

gulp.task('min',[
  'min:js',
  'min:css'
]);

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
  'clean',
  'min',
  'develop'
]);
