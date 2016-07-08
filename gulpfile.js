//plugins
var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  rimraf = require('rimraf'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  rev = require('gulp-rev'),
  revCollector = require('gulp-rev-collector'),
  browserSync = require('browser-sync');


//production files
var min = {
  'js': './public/dist/min-*.js',
  'css': './public/dist/min-*.css'
};

//source files
var srcJS = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/angular/angular.min.js',
  'node_modules/angular-route/angular-route.min.js',
  'node_modules/angular-animate/angular-animate.min.js',
  'public/scripts/common/*.js',
  'public/scripts/modules/*.js',
  'public/scripts/controllers/*.js',
  'public/scripts/directives/*.js',
  'public/scripts/effects/*.js',
  'public/scripts/filters/*.js',
  'public/scripts/services/*.js'
];

var srcCSS = [
  './node_modules/bootstrap/dist/css/bootstrap.min.css',
  './public/styles/animate.css',
  './public/styles/fonts.css',
  './public/styles/style.css',
];

/*--------------------Tasks-------------------*/
gulp.task('clean:minjs', function (cb) { rimraf(min['js'], cb); })

gulp.task('clean:mincss', function (cb) { rimraf(min['css'], cb); });

gulp.task('min:js', function () {
  gulp.src(srcJS, { base: '.' })
    .pipe(concat('min.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/dist/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'));
});

gulp.task('min:css', function () {
  gulp.src(srcCSS, { base: '.' })
    .pipe(concat('min.css'))
    .pipe(cssmin())
    .pipe(rev())
    .pipe(gulp.dest('./public/dist/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});

gulp.task('clean', [
  'clean:minjs',
  'clean:mincss'
]);

gulp.task('min', [
  'min:js',
  'min:css'
]);

//support rewrite url in html
gulp.task('rev', function () {
  gulp.src(['./rev/**/*.json', './public/index.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest('./public/'));
});

//start local server by nodemon
gulp.task('serve', function () {
  nodemon({
    script: 'server',
    ext: 'js',
    stdout: false
  }).on('readable', function () {
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

//add browser refresh
gulp.task('browser-sync', ['serve'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    browser: 'google chrome',
    notify: false,
    port: 5000
  });

  gulp.watch(["public/scripts/**/*.js",], ['min:js']);
  gulp.watch("public/styles/**/*.css", ['min:css']);
  gulp.watch("public/dist/**/*.*", ['rev']);
  gulp.watch("public/*.html").on('change', browserSync.reload);
});

//for npm release
gulp.task('deploy', [
  'clean',
  'min',
  'rev'
]);


//final task
gulp.task('default', [
  'clean',
  'min',
  'browser-sync'
]);
