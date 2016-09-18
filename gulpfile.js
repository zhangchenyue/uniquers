//plugins
var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  zip = require('gulp-zip'),
  inject = require('gulp-inject'),
  browserSync = require('browser-sync'),
  runSequence = require('run-sequence');


function createToken() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() + s4();
};

var hash = createToken();

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
  './public/styles/style.scss',
];

/*--------------------Tasks-------------------*/
gulp.task('clean', function () {
  return gulp.src(['public/dist'], { read: false })
    .pipe(clean());
});

gulp.task('clean:package', function () {
  return gulp.src(['_package'], { read: false })
    .pipe(clean());
});

gulp.task('min:js', function () {
  return gulp.src(srcJS, { base: '.' })
    .pipe(concat('min-' + hash + '.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('min:css', function () {
  return gulp.src(srcCSS, { base: '.' })
    .pipe(sass())
    .pipe(concat('min-' + hash + '.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('cat:js', function () {
  return gulp.src(srcJS, { base: '.' })
    .pipe(concat('min.js'))
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('cat:css', function () {
  return gulp.src(srcCSS, { base: '.' })
    .pipe(sass())
    .pipe(concat('min.css'))
    .pipe(gulp.dest('./public/dist/'));
});

// Generate new index html 
gulp.task('inject', function () {
  return gulp.src('./public/index.html')
    .pipe(inject(gulp.src([
      './public/dist/min*.js',
      './public/dist/min*.css'
    ],
      { read: false }),
      { ignorePath: 'public' }))
    .pipe(gulp.dest('public'));
});

gulp.task('package', ['clean:package'], function () {
  var files = [
    './**',
    '!./{.git,.git/**}',
    '!./{._package,._package/**}',
    '!./{public/styles,public/styles/**}',
    '!./{public/scripts,public/scripts/**}',
    '!./gulpfile.js',
    '!./.gitignore',
    '!./README.md',
    '!./LICENSE'
  ];
  return gulp.src(files, { dot: true }).pipe(zip('Package.zip'))
    .pipe(gulp.dest('./_package'));
});

//start local server by nodemon
gulp.task('serve', function () {
  nodemon({
    script: 'server',
    ext: 'js',
    watch: ['server.js', 'routes'],
    stdout: false
  }).on('readable', function () {
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

//add browser refresh
gulp.task('browser-sync', ['serve'], function () {
  gulp.watch(["public/scripts/**/*.*",], ['min:js']);
  gulp.watch("public/styles/**/*.*", ['min:css']);
  gulp.watch("public/**/*.html").on('change', browserSync.reload);
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    browser: 'google chrome',
    notify: false,
    port: 5000
  });

});

//for npm release
gulp.task('deploy', ['clean'], function () {
  return runSequence(['min:js', 'min:css'],'inject');
});

gulp.task('debug', ['clean'], function () {
  runSequence(['cat:css', 'cat:js'],'inject');
});

gulp.task('browser-sync-debug', ['serve'], function () {
  gulp.watch(["public/scripts/**/*.*",], ['cat:js']);
  gulp.watch("public/styles/**/*.*", ['cat:css']);
  gulp.watch("public/**/*.html").on('change', browserSync.reload);
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    browser: 'google chrome',
    notify: false,
    port: 5000
  });

});