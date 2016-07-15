//plugins
var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  rev = require('gulp-rev'),
  zip = require('gulp-zip'),
  revCollector = require('gulp-rev-collector'),
  browserSync = require('browser-sync'),
  runSequence = require('run-sequence');

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
  return gulp.src(['rev', 'public/dist'], { read: false })
    .pipe(clean());
});

gulp.task('clean:package', function () {
  return gulp.src(['_package'], { read: false })
    .pipe(clean());
});

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
    .pipe(sass())
    .pipe(concat('min.css'))
    .pipe(cssmin())
    .pipe(rev())
    .pipe(gulp.dest('./public/dist/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});

gulp.task('cat:js', function () {
  gulp.src(srcJS, { base: '.' })
    .pipe(concat('min.js'))
    .pipe(rev())
    .pipe(gulp.dest('./public/dist/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'));
});

gulp.task('cat:css', function () {
  gulp.src(srcCSS, { base: '.' })
    .pipe(sass())
    .pipe(concat('min.css'))
    .pipe(rev())
    .pipe(gulp.dest('./public/dist/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});

gulp.task('min', ['min:js', 'min:css']);

//support rewrite url in html
gulp.task('rev', function () {
  gulp.src(['./rev/**/*.json', './public/index.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest('./public/'));
});


gulp.task('package', ['clean:package'], function () {
  var files = [
    './**',
    '!./{rev,rev/**}',
    '!./{.git,.git/**}',
    '!./{._package,._package/**}',
    '!./{public/styles,public/styles/**}',
    '!./{public/scripts,public/scripts/**}',
    '!./{rev,rev/**}',
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
  gulp.watch("rev/**/*", ['rev']);
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
  runSequence(['min:css', 'min:js']);
});

gulp.task('debug', ['clean'], function () {
  runSequence(['cat:css', 'cat:js']);
});

gulp.task('browser-sync-debug', ['serve'], function () {
  gulp.watch("rev/**/*", ['rev']);
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