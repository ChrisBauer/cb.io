var gulp = require('gulp');
var runSequence = require ('run-sequence');
var vinylPaths = require('vinyl-paths');
var del = require('del');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
	less: 'shared/src/**/*.less',
	css: 'shared/src/**/*.css',
	output: 'dist/'
};

gulp.task('clean', function () {
	return gulp.src([paths.output])
		.pipe(vinylPaths(del));
});

gulp.task('copy-css', function () {
	return gulp.src(paths.css)
		.pipe(gulp.dest(paths.output));
});

gulp.task('build-less', function () {
	return gulp.src(paths.less)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.output));
});

gulp.task('build', function () {
	return runSequence(
		'clean',
		['copy-css', 'build-less']
	);
});
