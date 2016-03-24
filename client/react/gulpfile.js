
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');

gulp.task('build-shared-js', shell.task([
    'cd .. && npm run build-shared-js'
]));

gulp.task('build-shared-js-prod', shell.task([
    'cd .. && npm run build-shared-js-prod'
]));

gulp.task('build', ['build-shared-js'], function () {
    return browserify({
        entries: 'src/js/main.js',
        extensions: ['.js'],
        debug: true
    })
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-prod', ['build-shared-js'], function () {
    return browserify({
        entries: 'src/js/main.js',
        extensions: ['.js'],
        debug: true
    })
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
