'use strict';

const gulp = require('gulp');
const Builder = require('systemjs-builder');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');

const utilities = require('gulp-utilities');
utilities.gulp.clean.config();

const scriptFiles = ['./source/**/*.js', './source/**/*.html', './source/**/*.css', '!./source/**/*.tests.js'];
const cssFiles = ['./node_modules/ng-wig/dist/**/*.css', './libraries/**/*.css', './source/**/*.css', '!./source/**/*ng2.css'];

gulp.task('bundle-bootstrapper.watch', (done) => {
	gulp.watch(scriptFiles, ['bundle-bootstrapper']);
});

gulp.task('bundle-bootstrapper', (done) => {
	runSequence('systemjs',
				'bundle-css',
				'bundle-css.minify',
				done);
});

gulp.task('bundle-css', () => {
	return gulp.src(cssFiles)
		.pipe(concat('components.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('bundle-css.minify', () => {
	return gulp.src(cssFiles)
		.pipe(cleanCss())
		.pipe(concat('components.min.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('systemjs', (done) => {
	var builder = new Builder();

	builder.loadConfig('./system.config.js')
		.then(() => {
			return builder.bundle('bootstrapper/app.js', 'bootstrapper/app.bundle.js', {
				sourceMaps: true,
			});
		})
		.then(() => {
			console.log('Build complete');
			done();
		})
		.catch((err) => {
			console.log('Build error');
			console.error(err);
		});
});

gulp.task('systemjs-for-tests', (done) => {
	var builder = new Builder();

	builder.loadConfig('./system.config.js')
		.then(() => {
			return builder.bundle('source/ui.module.js', 'tests/tests.bundle.js', {
				sourceMaps: true,
			});
		})
		.then(() => {
			console.log('Build complete');
			done();
		})
		.catch((err) => {
			console.log('Build error');
			console.error(err);
		});
});
