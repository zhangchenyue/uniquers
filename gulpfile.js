var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  rimraf = require('rimraf'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  rev = require('gulp-rev'),                                //- 对文件名加MD5后缀
  revCollector = require('gulp-rev-collector'),           //- 路径替换
  browserSync = require('browser-sync');

//clean javascript task
gulp.task('clean:minjs', function (cb) {
  rimraf('./public/scripts/min-*.js', cb);
})

//clean css task
gulp.task('clean:mincss', function (cb) {
  rimraf('./public/styles/min-*.css', cb);
});

//minify javascript files
gulp.task('min:js', ['clean:minjs'], function () {
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
    .pipe(concat('min.js'))
    .pipe(uglify())
    .pipe(rev())                                            //- 文件名加MD5后缀
    .pipe(gulp.dest('./public/scripts/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'));
});

//minify css files
gulp.task('min:css', ['clean:mincss'], function () {
  gulp.src(['./public/styles/*.css'], { base: '.' })
    .pipe(concat('min.css'))
    .pipe(cssmin())
    .pipe(rev())                                            //- 文件名加MD5后缀
    .pipe(gulp.dest('./public/styles/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});

//clean javascript and css
gulp.task('clean', [
  'clean:minjs',
  'clean:mincss'
]);

//minify javascript and css files and merge to one file
gulp.task('min', [
  'min:js',
  'min:css'
]);

//for developer use support livereload
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

//add browser refresh
gulp.task('browser-sync', ['develop'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    browser: 'google chrome',
    notify: false,
    port: 5000
  });
});

//support rewrite url in html
gulp.task('rev', function () {
  gulp.src(['./rev/**/*.json', './public/index.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest('./public/'));
});

//final task
gulp.task('default', [
  'clean',
  'min',
  'rev',
  'browser-sync'
]);
